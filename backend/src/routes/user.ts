import { signinInput, signupInput } from '@gauravvv/medium-common';
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
    const {success} =signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs are not correct"
      })
    }
    console.log("Signup Body:", body);
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
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
    const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
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