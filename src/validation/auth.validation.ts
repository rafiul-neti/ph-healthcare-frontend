import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
});

export const patientRegistrationZodSchema = z
  .object({
    name: z
      .string("Invalid Input")
      .min(3, "Name must atleast 3 characters long!!!")
      .max(20, "Name cannot exceed 20 characters."),
    email: z.email("Invalid email address!"),
    password: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")

      .regex(/[0-9]/, "Password must contain at least 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 Special Character",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")

      .regex(/[0-9]/, "Password must contain at least 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 Special Character",
      ),

    contactNumber: z
      .string()
      .regex(
        /^(?:\+?880|0)1[3-9]\d{8}$/,
        "Please provide a valid Bangladeshi number",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match!",
    path: ["confirmPassword"],
  });
