import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { signupInput, signinInput } from "@sniperxyz/medium-common";




export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
    }
}>();

userRouter.post("/signup", async (c) => {  
    const body = await c.req.json();

    const success = signupInput.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({error: "Invalid request body"})
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
    
      const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
  
      return c.text(token);
    } catch (e) {
      c.status(403);
      return c.text("User already exists");
    }
  });
  
  userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const success = signinInput.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({error: "Invalid request body"})
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
  
      if (!user) {
        c.status(404);
        return c.json("User not found");
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
  
      return c.text( jwt );
    } catch (e) {
      c.status(411);
      return c.text("Invalid");
    }
  });