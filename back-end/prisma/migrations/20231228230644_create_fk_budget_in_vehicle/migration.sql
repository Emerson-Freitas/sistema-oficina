-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "vehicle_id" TEXT NOT NULL DEFAULT '134c056c-1997-4e45-85fe-6299ed29d1f6';

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
