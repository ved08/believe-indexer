-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "mint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_mint_key" ON "Token"("mint");
