import z from 'zod'

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3).optional()
})

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>


//signin
export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(5)
})

export type SigninInput = z.infer<typeof signinInput>


//creation of blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>


//update blog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>