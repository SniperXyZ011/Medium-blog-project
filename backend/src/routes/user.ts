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
    console.log(body);
    const success = signupInput.safeParse(body);
    console.log(success);
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
          username: body.username,
          password: body.password,
          name: body.name,
        },
      });
      console.log(user);
    
      const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
      console.log(token);
  
      return c.text(token);
    } catch (e) {
      console.log("Something is wrong");
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
          username: body.username,
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