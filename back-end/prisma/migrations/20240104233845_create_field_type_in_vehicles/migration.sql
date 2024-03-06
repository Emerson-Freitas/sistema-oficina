-- AlterTable
ALTER TABLE "users" ALTER COLUMN "picture" DROP DEFAULT;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Carro';
