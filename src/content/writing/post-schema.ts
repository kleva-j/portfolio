import { z } from "zod";

const monthPrecisionDate = z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/);

export const postFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  dateTime: z.union([z.iso.date(), monthPrecisionDate]),
  category: z.string(),
  description: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  socialImage: z.string().optional(),
  demo: z.boolean().default(false),
  draft: z.boolean().default(false),
});
