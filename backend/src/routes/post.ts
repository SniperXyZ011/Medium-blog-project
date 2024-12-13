import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import {
  createBlogInput,
  CreateBlogInput,
  updateBlogInput,
} from "@sniperxyz/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

postRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET_KEY);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "You are not logged in" });
  }
});

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const success = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid request body" });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: post.id,
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const success = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid request body" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },

    data: {
      title: body.title,
      content: body.content,
    },
  });
});

//add paigination
postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
        postDate: true,
      },
    });
    return c.json({ posts });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Error try again" });
  }
});

postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        postDate: true,
      },
    });

    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching post" });
  }
});
