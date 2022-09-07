-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);  
