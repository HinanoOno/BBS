-- CreateTable
CREATE TABLE "DogFood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "materials" TEXT[],
    "locality" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "DogFood_pkey" PRIMARY KEY ("id")
);
