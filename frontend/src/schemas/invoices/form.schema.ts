import { z } from "zod";

export const formSchema = z.object({
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.string().email("invalid email address"),
  createdAt: z.date({ message: "invalid date" }),
  paymentTerms: z.number().int().min(1, "can't be empty"),
  description: z.string().min(1, "can't be empty"),
  senderAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  clientAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
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
