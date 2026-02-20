import { getMyInfo } from "@/actions/customer.actions";
import { CustomerProfileCard } from "@/components/modules/customer/CustomerProfileCard";

export default async function ProfilePage () {

  const data = await getMyInfo();
  // console.log(data.data);
  
  return (
    
    <div>

      <CustomerProfileCard user = {data.data} />

    </div>
    
  );
}