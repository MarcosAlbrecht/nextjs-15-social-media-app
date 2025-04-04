import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email({
    message: "Invalid email address",
  }),
  username: requiredString.regex(
    /^[a-zA-Z0-9_]+$/,
    "Only latters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type SignupValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;
