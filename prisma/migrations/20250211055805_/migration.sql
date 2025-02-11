-- AlterTable
ALTER TABLE "ShortLink" ADD COLUMN "expiresAt" DATETIME;

-- CreateIndex
CREATE INDEX "ShortLink_expiresAt_idx" ON "ShortLink"("expiresAt");
