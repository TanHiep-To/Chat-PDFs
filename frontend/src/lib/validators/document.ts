import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.string(),
  createdAt: z.string(),
  status: z.string(),
  type: z.string().optional(),
});

export type Document = z.infer<typeof documentSchema>;
