import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter=new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>();
blogRouter.post("/",async(c)=>{
  const body=await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog=await prisma.post.create({
    data:{
      title:body.title,
      content:body.content,
      authorId:"1"
    }
  })
  return c.json({
    id:blog.id,
  })
})
blogRouter.put("/",async(c)=>{
   const body=await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog=await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.json({
    id: blog.id,
  })
})

blogRouter.get("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
const blog=await prisma.post.findFirst({
    where:{
      id:body.id
    }
  })
  return c.json({
    id:blog?.id,
  })
  } catch (error) {
    c.status(411);
    return c.json({
      message:"Error while fetching the blog post"
    })
  }
})
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs=await prisma.post.findMany();
  return c.json({
    blogs
  })

})