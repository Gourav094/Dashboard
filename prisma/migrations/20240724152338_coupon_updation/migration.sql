/*
  Warnings:

  - You are about to drop the column `price` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `maxDiscount` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minOrderValue` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "maxDiscount" INTEGER NOT NULL,
    "minOrderValue" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Coupon" ("code", "createdAt", "id", "isAvailable") SELECT "code", "createdAt", "id", "isAvailable" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
