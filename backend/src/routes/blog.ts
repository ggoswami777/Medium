import { Hono } from "hono";

export const blogRouter=new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>();
blogRouter.post("/",(c)=>{
  return c.text("blog post");
})
blogRouter.put("/",(c)=>{
  return c.text("blog put");
})

blogRouter.get("/",(c)=>{
  const id=c.req.param('id');
  return c.text("Get Blog:"+id);
})
blogRouter.get("/bulk",(c)=>{
    return c.text("Hello Hono!")
})