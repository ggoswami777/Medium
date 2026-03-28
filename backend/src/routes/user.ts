import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter=new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    console.log("Signup Body:", body);
    
    if (!body.email || !body.password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
    return c.json({ jwt });
  } catch (e: any) {
    console.error("Signup Error Detailed:", e);
    
    return c.json({ error: "Internal server error", message: e.message }, 500);
  }
})
userRouter.post("/login",async(c)=>{
   const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const body=await c.req.json();
    try {
      const user=await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
      if(!user){
        c.status(403);
		    return c.json({ error: "user not found" });
      }
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
      return c.json({ jwt });
    } catch (error) {
      return c.status(403);
    }
 
})