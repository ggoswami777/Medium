import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>().basePath('/api/v1')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.use('/blog/*', async (c, next) => {
  const header=c.req.header("authorization")||"";
  const token=header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET, 'HS256');
  if(response.id){
     await next()
  }else{
    c.status(403);
    return c.json("unauthorized");
  }
 
})
app.post("/user/signup", async (c) => {
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
app.post("/user/login",async(c)=>{
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
app.post("/blog",(c)=>{
  return c.text("blog post");
})
app.put("/blog",(c)=>{
  return c.text("blog put");
})


app.get("/blog/:id",(c)=>{
  const id=c.req.param('id');
  return c.text("Get Blog:"+id);
})

export default app
