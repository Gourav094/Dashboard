/*
  Warnings:

  - You are about to alter the column `isAdmin` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleId" TEXT,
    "reset_password_token" TEXT,
    "reset_password_expire_date" DATETIME,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "googleId", "id", "isAdmin", "password", "reset_password_expire_date", "reset_password_token", "updatedAt", "userName") SELECT "createdAt", "email", "googleId", "id", "isAdmin", "password", "reset_password_expire_date", "reset_password_token", "updatedAt", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_reset_password_token_key" ON "User"("reset_password_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
