ALTER TABLE "Program" ADD COLUMN "referenceCode" TEXT;
ALTER TABLE "InternshipApplication" ADD COLUMN "referenceCode" TEXT;
ALTER TABLE "CourseEnrollment" ADD COLUMN "referenceCode" TEXT;
WITH ranked AS (
  SELECT "id", 'ELR-' || CASE "kind"::text WHEN 'INTERNSHIP' THEN 'INT' WHEN 'COURSE' THEN 'CRS' WHEN 'CERTIFICATION' THEN 'CRT' WHEN 'WORKSHOP' THEN 'WSH' WHEN 'WEBINAR' THEN 'WEB' ELSE 'BOT' END || '-' || LEFT(UPPER(REGEXP_REPLACE("slug", '[^a-zA-Z0-9]+', '-', 'g')), 12) || '-' || LPAD(ROW_NUMBER() OVER (PARTITION BY "kind", LEFT(UPPER(REGEXP_REPLACE("slug", '[^a-zA-Z0-9]+', '-', 'g')), 12) ORDER BY "createdAt", "id")::text, GREATEST(3, LENGTH(ROW_NUMBER() OVER (PARTITION BY "kind", LEFT(UPPER(REGEXP_REPLACE("slug", '[^a-zA-Z0-9]+', '-', 'g')), 12) ORDER BY "createdAt", "id")::text)), '0') AS code FROM "Program"
) UPDATE "Program" p SET "referenceCode" = ranked.code FROM ranked WHERE p."id" = ranked."id";
WITH ranked AS (SELECT "id", TO_CHAR("createdAt", 'YYYY') AS yr, ROW_NUMBER() OVER (PARTITION BY TO_CHAR("createdAt", 'YYYY') ORDER BY "createdAt", "id") AS seq FROM "InternshipApplication")
UPDATE "InternshipApplication" a SET "referenceCode" = 'ELR-APP-' || ranked.yr || '-' || LPAD(ranked.seq::text, GREATEST(4, LENGTH(ranked.seq::text)), '0') FROM ranked WHERE a."id" = ranked."id";
WITH ranked AS (SELECT "id", TO_CHAR("enrolledAt", 'YYYY') AS yr, ROW_NUMBER() OVER (PARTITION BY TO_CHAR("enrolledAt", 'YYYY') ORDER BY "enrolledAt", "id") AS seq FROM "CourseEnrollment")
UPDATE "CourseEnrollment" e SET "referenceCode" = 'ELR-ENR-' || ranked.yr || '-' || LPAD(ranked.seq::text, GREATEST(4, LENGTH(ranked.seq::text)), '0') FROM ranked WHERE e."id" = ranked."id";
CREATE UNIQUE INDEX "Program_referenceCode_key" ON "Program"("referenceCode");
CREATE UNIQUE INDEX "InternshipApplication_referenceCode_key" ON "InternshipApplication"("referenceCode");
CREATE UNIQUE INDEX "CourseEnrollment_referenceCode_key" ON "CourseEnrollment"("referenceCode");
CREATE TABLE "ReferenceCounter" ("key" TEXT NOT NULL, "value" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "ReferenceCounter_pkey" PRIMARY KEY ("key"));
INSERT INTO "ReferenceCounter" ("key", "value") SELECT 'APP:' || TO_CHAR("createdAt", 'YYYY'), COUNT(*) FROM "InternshipApplication" GROUP BY TO_CHAR("createdAt", 'YYYY');
INSERT INTO "ReferenceCounter" ("key", "value") SELECT 'ENR:' || TO_CHAR("enrolledAt", 'YYYY'), COUNT(*) FROM "CourseEnrollment" GROUP BY TO_CHAR("enrolledAt", 'YYYY');
INSERT INTO "ReferenceCounter" ("key", "value") SELECT 'PROGRAM:' || "kind"::text || ':' || LEFT(UPPER(REGEXP_REPLACE("slug", '[^a-zA-Z0-9]+', '-', 'g')), 12), COUNT(*) FROM "Program" GROUP BY "kind", LEFT(UPPER(REGEXP_REPLACE("slug", '[^a-zA-Z0-9]+', '-', 'g')), 12);
CREATE TABLE "CompletionRecord" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "programId" TEXT NOT NULL, "enrollmentId" TEXT, "recordedByAdminId" TEXT NOT NULL, "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "completionCriteria" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "CompletionRecord_pkey" PRIMARY KEY ("id"), CONSTRAINT "CompletionRecord_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "CourseEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT "CompletionRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT "CompletionRecord_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT "CompletionRecord_recordedByAdminId_fkey" FOREIGN KEY ("recordedByAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE);
CREATE UNIQUE INDEX "CompletionRecord_enrollmentId_key" ON "CompletionRecord"("enrollmentId");
CREATE UNIQUE INDEX "CompletionRecord_userId_programId_key" ON "CompletionRecord"("userId", "programId");
CREATE INDEX "CompletionRecord_recordedByAdminId_createdAt_idx" ON "CompletionRecord"("recordedByAdminId", "createdAt");
ALTER TABLE "Certificate" ADD COLUMN "completionRecordId" TEXT;
CREATE UNIQUE INDEX "Certificate_completionRecordId_key" ON "Certificate"("completionRecordId");
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_completionRecordId_fkey" FOREIGN KEY ("completionRecordId") REFERENCES "CompletionRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
