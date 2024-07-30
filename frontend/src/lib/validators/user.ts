import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  is_banned: z.boolean(),
  is_verified: z.boolean(),
  is_vip: z.boolean(),
  // password: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof userSchema>;
