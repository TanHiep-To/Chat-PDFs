import { z } from "zod";

export const AddMessageValidator = z.object({
  fileId: z.string(),
  content: z.string().min(1),
});

export type TAddMessageValidator = z.infer<typeof AddMessageValidator>;

export const GetMessageValidator = z.object({
  limit: z.number().min(1).max(100).optional(),
  cursor: z.string().optional(),
  fileId: z.string(),
});

export type TGetMessageValidator = z.infer<typeof GetMessageValidator>;
