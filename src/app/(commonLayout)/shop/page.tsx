
import MedicineCards from "@/components/modules/home/MedicineCard";
import { medicineService } from "@/services/medicine.service";
import { MedicinePost } from "@/types/routes.type";

export default async function Home() {
  const {data} = await medicineService.getAllMedicine(
    {
      // search : "tulos",
      // price : 10
    }
  );

  // console.log(data);
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {
        // <TextArea
        data?.data?.map((item : MedicinePost) => (
        <MedicineCards key={item.id} item = {item} />
      )) 
      }
    </div>
  );
}
