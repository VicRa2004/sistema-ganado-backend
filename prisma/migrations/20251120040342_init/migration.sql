-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" "UserRole" NOT NULL,
    "email_confirm" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Race" (
    "id_race" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id_race")
);

-- CreateTable
CREATE TABLE "Iron" (
    "id_iron" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Iron_pkey" PRIMARY KEY ("id_iron")
);

-- CreateTable
CREATE TABLE "Ground" (
    "id_ground" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "width" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "address" TEXT,
    "notes" TEXT,
    "id_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ground_pkey" PRIMARY KEY ("id_ground")
);

-- CreateTable
CREATE TABLE "Cattle" (
    "id_cattle" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "father" INTEGER,
    "mother" INTEGER,
    "gender" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "observations" TEXT,
    "image" TEXT NOT NULL,
    "reason_for_withdrawal" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "id_iron" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_ground" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cattle_pkey" PRIMARY KEY ("id_cattle")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Iron" ADD CONSTRAINT "Iron_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ground" ADD CONSTRAINT "Ground_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_iron_fkey" FOREIGN KEY ("id_iron") REFERENCES "Iron"("id_iron") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_race_fkey" FOREIGN KEY ("id_race") REFERENCES "Race"("id_race") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_id_ground_fkey" FOREIGN KEY ("id_ground") REFERENCES "Ground"("id_ground") ON DELETE CASCADE ON UPDATE CASCADE;
