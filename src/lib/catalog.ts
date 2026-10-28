import { ProgramKind, ProgramStatus } from "@/generated/prisma/client";
import { db } from "@/lib/prisma";
import { internships } from "@/lib/internships";

const programKinds: Record<string, ProgramKind> = {
  internships: ProgramKind.INTERNSHIP,
  courses: ProgramKind.COURSE,
  workshops: ProgramKind.WORKSHOP,
  webinars: ProgramKind.WEBINAR,
  bootcamps: ProgramKind.BOOTCAMP,
  certifications: ProgramKind.CERTIFICATION,
};

export async function getPrograms(collection: string) {
  const kind = programKinds[collection];
  if (!kind) return [];
  if (collection === "internships") {
    const stored = await db.program.findMany({
      where: { kind, status: ProgramStatus.PUBLISHED, publishedAt: { lte: new Date() } },
      orderBy: [{ publishedAt: "desc" }, { title: "asc" }],
    }).catch(() => []);
    const bySlug = new Map(stored.map((program) => [program.slug, program]));
    return internships.map((program) => ({
      ...bySlug.get(program.slug),
      ...program,
      id: bySlug.get(program.slug)?.id ?? program.slug,
      kind,
      status: ProgramStatus.PUBLISHED,
    }));
  }
  return db.program.findMany({
    where: { kind, status: ProgramStatus.PUBLISHED, publishedAt: { lte: new Date() } },
    orderBy: [{ publishedAt: "desc" }, { title: "asc" }],
  }).catch(() => []);
}

export async function getProgram(collection: string, slug: string) {
  const kind = programKinds[collection];
  if (!kind) return null;
  if (collection === "internships") {
    const canonical = internships.find((program) => program.slug === slug);
    if (!canonical) return null;
    const stored = await db.program.findFirst({ where: { kind, slug, status: ProgramStatus.PUBLISHED, publishedAt: { lte: new Date() } } }).catch(() => null);
    return { ...stored, ...canonical, curriculum: canonical.curriculum, id: stored?.id ?? canonical.slug, kind, status: ProgramStatus.PUBLISHED };
  }
  return db.program.findFirst({ where: { kind, slug, status: ProgramStatus.PUBLISHED, publishedAt: { lte: new Date() } } }).catch(() => null);
}

export async function getServices() {
  return db.service.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { title: "asc" }] }).catch(() => []);
}

export async function getTechnologies() {
  return db.technology.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { title: "asc" }] }).catch(() => []);
}

export async function getArticles() {
  return db.blogPost.findMany({ where: { published: true, publishedAt: { lte: new Date() } }, include: { category: true }, orderBy: { publishedAt: "desc" } }).catch(() => []);
}