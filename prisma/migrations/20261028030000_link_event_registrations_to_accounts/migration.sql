ALTER TABLE "WorkshopRegistration" ADD COLUMN "userId" TEXT;
ALTER TABLE "WebinarRegistration" ADD COLUMN "userId" TEXT;
ALTER TABLE "WorkshopRegistration" ADD CONSTRAINT "WorkshopRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WebinarRegistration" ADD CONSTRAINT "WebinarRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "WorkshopRegistration_userId_idx" ON "WorkshopRegistration"("userId");
CREATE INDEX "WebinarRegistration_userId_idx" ON "WebinarRegistration"("userId");
