import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import {createBlogInput, updateBlogInput} from '@rks007/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    };
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user) {
            const userId: any = user.id;
            c.set('userId', userId)
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "you are not logged in"
            })
        }
    } catch (error) {
        c.status(403)
        return c.text('you are not logged in') 
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "incorrect inputs"
        })
    }

    const authorId = c.get('userId');

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: parseInt(authorId),
                published: true
            }
        })

        return c.json({
            id: blog.id
        })
        
    } catch (error) {
        c.status(411);
        return c.text('error during creating the blog post')
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "incorrect inputs"
        })
    }

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id: blog
        })
        
    } catch (error) {
        c.status(411);
        return c.text('error during updating the blog the blog post')
    }
})

blogRouter.get('/bulk/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try {
    const blog = await prisma.blog.findFirst({
        where: {
            id: Number(id)
        },
        select: {
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

    return c.json({
        blog
    })
    
} catch (error) {
    c.status(411);
    return c.text('error during fetching the blog the blog post')
}
  
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())    

  const blogs = await prisma.blog.findMany({
    select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
    }
  });
  //console.log(blogs);
  

  return c.json({
    blogs
  })
})