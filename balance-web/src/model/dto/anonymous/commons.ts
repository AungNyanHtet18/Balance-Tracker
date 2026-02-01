import { z } from "zod";

export interface SignInForm {
    email : string
    password : string
}

/*
export type SignUpForm = SignInForm & {
    name : string
}
*/

export const signUpSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
});

export type SignUpForm = z.infer<typeof signUpSchema>;



export interface AuthResult {
    email : string
    name : string
    role : 'Admin' | 'Member'
    accessToken : string
    refreshToken : string
}



