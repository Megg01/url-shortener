-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShortLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "longUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clicks" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_ShortLink" ("createdAt", "id", "longUrl", "shortCode") SELECT "createdAt", "id", "longUrl", "shortCode" FROM "ShortLink";
DROP TABLE "ShortLink";
ALTER TABLE "new_ShortLink" RENAME TO "ShortLink";
CREATE UNIQUE INDEX "ShortLink_shortCode_key" ON "ShortLink"("shortCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
