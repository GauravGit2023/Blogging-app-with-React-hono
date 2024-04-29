import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@npmgaurav/medium-common";

export const blogRouter = new Hono<{ // passing as a generic to avoid typescript error
	Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables: {
        userId: string
  }
}>();

blogRouter.use('/*', async (c, next)=>{
    
    const header = c.req.header("authorization") || "";
    // bearer token
    const token = header.split(" ")[1];
    if(!token){
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
  
    try{
        // verifying token
        const response = await verify(token, c.env.JWT_SECRET);
        if(response.id){
            // passing variable to main route
            c.set('userId', response.id);
            await next();
        }
    } catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) =>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const userId = c.get("userId");
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });
    
    if(!post.id){
        c.status(403);
        return c.json({ msg: "post creation failed" })
    }

    c.status(200);
    return c.json({
        id: post.id
    });
})

// update blog route
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get("userId");
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }

    try{
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: post.id
        })
    } catch(e){
        c.status(403)
        return c.json({ msg: "post updation failed" })
    }
        
})

// writing this one before /:id to avoid error as this one will get checked first
blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        // needs pagination here
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        }
        );   

        return c.json({
            blogs
        })
    } catch(e){
        c.status(411)
        return c.json({
            msg: "errror while fetching all blogs"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id');
    console.log(id);
    // const id2 = id.substring(1);

    try{
        const post = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({ post });
    } catch(e){
        c.status(411)
        return c.json({
            msg: "errror while fetching blog post"
        })
    }
})