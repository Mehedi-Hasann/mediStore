
import { OrderCard } from "@/components/modules/seller/SellerOrderCard";
import { medicineService } from "@/services/medicine.service";
import { Orders } from "@/types/routes.type";

export default async function OrdersPage () {
  const {data} = await medicineService.getAllOrder();
  // console.log(data);
  
  return (
    
    <div>

      <OrderCard items = {data} />
      
    </div>
    
  );
}