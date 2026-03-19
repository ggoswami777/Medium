import { Hono } from 'hono'

const app = new Hono().basePath('/api/v1')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post("/user/signup",(c)=>{
  return c.text("signup");
})
app.post("/user/login",(c)=>{
  return c.text("login");
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
app.get("/blog/bulk",(c)=>{
  
})

export default app
