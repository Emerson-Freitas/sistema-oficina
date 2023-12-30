-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "vehicle_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "picture" TEXT NOT NULL DEFAULT '7eae686bdfe7e46a9c16ecc3a8fbdb25-foto-minha.jpg';
