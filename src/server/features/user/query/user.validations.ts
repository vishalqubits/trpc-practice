import { z } from "zod";

export const getUserQueryInputSchema = z.object({
  text: z.string(),
});
export type TGetUserQueryInputSchema = z.infer<typeof getUserQueryInputSchema>;

export const getUserQueryOuputSchema = z.object({
  greeting: z.string(),
});
export type TGetUserQueryOuputSchema = z.infer<typeof getUserQueryOuputSchema>;
