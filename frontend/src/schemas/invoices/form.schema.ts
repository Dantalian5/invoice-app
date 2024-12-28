import { z } from "zod";

export const formSchema = z.object({
  client_name: z.string().min(1, "can't be empty"),
  client_email: z.string().email("invalid email address"),
  created_at: z.date({ message: "invalid date" }),
  payment_terms: z.number().int().min(1, "can't be empty"),
  description: z.string().min(1, "can't be empty"),
  sender_address: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    post_code: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  client_address: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    post_code: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "can't be empty"),
        quantity: z.number().int().min(1, "can't be empty"),
        price: z.number().min(1, "can't be empty"),
      }),
    )
    .min(1, "An item most be added"),
});
export type FormSchema = z.infer<typeof formSchema>;
