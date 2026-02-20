import { env } from "@/env";
import { CreateNewMedicine, MedicineData, medicineParams, OrderStatus } from "@/types/routes.type";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;


export const medicineService = {
  createMedicine : async function (data : CreateNewMedicine) {
    try {
      const cookieStore = await cookies(); 
      const {id} = await this.getSingleCategory(data.category);
      // console.log(id);
      
      const updatedData = {
        name : data.name,
        price : data.price,
        stock : data.stock,
        categoryId : id
      }
      console.log(updatedData);
      
      const res = await fetch(`${API_URL}/api/seller/medicines`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body : JSON.stringify(updatedData)
      });
      const result = await res.json();
      if (result.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }
      return {data : result, error : null }
    } catch (error) {
      return {data : null, error : {messaage : "New Medicine Creation Failed"}}
    }
  },
  getSingleCategory : async function (cName : string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories/${cName}`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString(),
        }
      })
      return await res.json();
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error From getSingleCategory"}};
    }
  },
  getAllMedicine : async function (params ?: medicineParams) {
    try {

      const url = new URL(`${API_URL}/api/medicines`);

      if(params){
        Object.entries(params).map( ([key,value]) => {
          if(value !== undefined && value !== null &&  value !== ""){
            url.searchParams.append(key,value);
          }
        } )
      }

      const res = await fetch(url.toString(),{
        next : {
          tags : ["medicinePosts"]
        }
      });
      if(res.ok){
        // revalidateTag("medicinePosts","max");
        updateTag("medicinePosts");
      }
      const data = await res.json();

      // console.log(data);

      return {data: data, error : null};
    } catch (error) {
      console.log(error);
      return {data : null, error : {message : "Something Went Wrong !"}};
    }
  },
  getMedicineById : async function(slug : string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${slug}`);
      const data = await res.json();

      return {data : data, error : null};
    } catch (error) {
      console.log(error);
      return {data : null, error : {message : "Something went wrong to fetch single medicine"}}
    }
  },
  getAllCategory : async function() {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      });
      const data = await res.json();
      // console.log("here we go => ",data);
      return {data : data , error : null}
    } catch (error) {
      return {data : null, error : {message : "Fetch Category is not Happen.Internal Server Error"}}
    }
  },
  updateMedicine : async function(slug : string, medicineData : MedicineData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/medicines/${slug}`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(medicineData)
      });
      const data = await res.json();

      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Update Medicine failed due to Internal Error"}}
    }
  },
  deleteMedicine : async function (slug : string){
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/medicines/${slug}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString(),
        },
      })
      if(res.ok){
        updateTag("medicinePosts");
      }
      const data = await res.json();
      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Medicine Deletion Failed due to Internal Error"}}
    }
  },
  getAllOrder : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      });
      const data = await res.json();
      return {data : data, error : null}

    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },
  updateOrderStatusBySeller : async function ({id, status} : {id : string, status : OrderStatus}) {
    console.log('hi => ',JSON.stringify({status}));
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/orders/${id}`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify({status})
      })
      const data = await res.json();
      console.log(data);
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Update Status Failed Due to Internal Server Error"}}
    }
  }
}