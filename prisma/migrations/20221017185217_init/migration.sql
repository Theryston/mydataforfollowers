-- CreateTable
CREATE TABLE "email" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "profileLink" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inviteId" INTEGER,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codeVerification" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "emailId" INTEGER NOT NULL,

    CONSTRAINT "codeVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invite" (
    "id" SERIAL NOT NULL,
    "profileLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_email_key" ON "email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_profileLink_key" ON "email"("profileLink");

-- CreateIndex
CREATE UNIQUE INDEX "codeVerification_code_key" ON "codeVerification"("code");

-- CreateIndex
CREATE UNIQUE INDEX "invite_profileLink_key" ON "invite"("profileLink");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "invite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codeVerification" ADD CONSTRAINT "codeVerification_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
