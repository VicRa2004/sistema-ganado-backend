-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_father_fkey" FOREIGN KEY ("father") REFERENCES "Cattle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cattle" ADD CONSTRAINT "Cattle_mother_fkey" FOREIGN KEY ("mother") REFERENCES "Cattle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
