import { MedicinesTable } from "@/components/modules/seller/SellerMedicineTable"
import { medicineService } from "@/services/medicine.service"

export default async function AllMedicinesPage() {
  const allMedicine = await medicineService.getAllMedicine()

  const medicines = allMedicine?.data || []
  // console.log(medicines.data);
  

  return (
    <div className="space-y-6">
      <MedicinesTable medicines = {medicines.data} />
    </div>
  )
}
