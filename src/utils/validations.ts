import * as z from 'zod'

export const initialLoginValues = {
    email: '',
    password: ''
}

export const loginValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

export type LoginValues = z.infer<typeof loginValidationSchema>