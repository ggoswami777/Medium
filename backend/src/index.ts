import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>().basePath('/api/v1')

app.route("/user",userRouter)
app.route("/blog",blogRouter)
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
