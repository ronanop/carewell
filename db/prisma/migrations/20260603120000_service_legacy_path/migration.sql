-- AlterTable
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "legacyPath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Service_legacyPath_key" ON "Service"("legacyPath");
