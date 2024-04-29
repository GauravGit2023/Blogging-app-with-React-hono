import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from "@npmgaurav/medium-common"

export const userRouter = new Hono<{ // passing as a generic to avoid typescript error
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables: {
        userId: string
    }
}>();
  
// signup route
userRouter.post('/signup', async (c) => {
    console.log("signup route")
    const body = await c.req.json();   // we use await here because data is being converted to json
    
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    //ts-ignore : to avoid typecript in next line
    try{
        console.log(body);
        console.log("signup route3")
        //adding new user
        const user = await prisma.user.create({
            data:{
            email: body.username,
            password: body.password,
            name: body.name
            }
        });
        console.log("signup route4")
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        })
    } catch (e){
        return c.status(403);
    } 
})

// signin route
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }
    try{
    // finding if username already exists
    const user = await prisma.user.findUnique({
        where: {
        email: body.username,
        password: body.password
        },
    })

    //signing in user if user exist in db
    if(!user){
        c.status(403)
        return c.json({
        msg: "User not found"
        })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
        jwt: token
    })
    } catch (e){
        return c.status(403);
    }
})