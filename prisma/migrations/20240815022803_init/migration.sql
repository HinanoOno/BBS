/*
  Warnings:

  - You are about to drop the `DogFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DogFood";

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "materials" TEXT[],
    "locality" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
