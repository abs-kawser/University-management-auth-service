import { z } from 'zod'

//use Zod
const createUserZodeSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'role is required',
      }),
      password: z.string().optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodeSchema,
}
//req-validation
//body-object
//data -objec
