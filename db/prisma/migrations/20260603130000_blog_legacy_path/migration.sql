-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "legacyPath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_legacyPath_key" ON "BlogPost"("legacyPath");
