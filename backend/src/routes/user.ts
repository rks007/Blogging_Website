import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import {signupInput, signinInput} from '@rks007/medium-common'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
}>();

//signup
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          username: body.username,
          password: body.password
        }
      })
  
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  
      return c.json({
        msg: "signed successfully",
        jwt
      })
      
    } catch (error) {
      c.status(411);
      return c.text('error occurred while signing up');
    }
  })
  
  //signin
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message: "inputs are not correct"
        })
    }
  
    try {
      const userExist = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password
        }
      })
  
      if(!userExist){
        c.status(403);
        return c.text('user not exist, please signup first');
      }
  
      const jwt = await sign({id: userExist.id}, c.env.JWT_SECRET);
  
      return c.json({
        msg: "signedin successfully",
        jwt
      })
      
    } catch (error) {
      c.status(411);
      return c.text('error occurred while signing in');
    }
  
  })