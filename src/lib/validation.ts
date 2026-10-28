import { z } from "zod";

export const emailSchema = z.email().max(254).transform((value) => value.trim().toLowerCase());
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  organization: z.string().trim().max(180).optional(),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(180).optional(),
  message: z.string().trim().min(10).max(8000),
});
export const credentialsSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: emailSchema,
  password: z.string().min(12).max(128),
});

export const registerSchema = z.object({ name: z.string().trim().min(2).max(120), email: emailSchema, password: z.string().min(12).max(128) });
export const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) });
export const applicationSchema = z.object({ fullName: z.string().trim().min(2).max(120), email: emailSchema, phone: z.string().trim().max(40).optional() });
export const curriculumPhaseSchema = z.object({ weeks: z.string().trim().min(1).max(80), title: z.string().trim().min(1).max(180), topics: z.array(z.string().trim().min(1).max(500)).min(1).max(12), optional: z.boolean().optional() });
export const programSchema = z.object({ curriculum: z.array(curriculumPhaseSchema).max(12).optional(), kind: z.enum(["INTERNSHIP","COURSE","WORKSHOP","WEBINAR","BOOTCAMP","CERTIFICATION"]), title: z.string().trim().min(3).max(180), slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180), summary: z.string().trim().min(10).max(500), description: z.string().trim().min(20).max(20000), status: z.enum(["DRAFT","PUBLISHED","ARCHIVED"]).default("DRAFT"), category: z.string().trim().max(120).optional(), duration: z.string().trim().max(120).optional(), mode: z.string().trim().max(80).optional(), pricePaise: z.number().int().min(0).max(100000000).default(0) });

