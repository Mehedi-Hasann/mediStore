import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface EditInfo{
  name : string,
  email : string
}

export const customerService = {
  getMyInfo : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/auth/me`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      })
      const data = await res.json();
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Error Happen Due to Internal Server Error for getting MyInfo"}}
    }
  },
  editMyInfo : async function (payload : EditInfo) {
    // console.log(payload);
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/auth/profile`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(payload)
      })
      const data = await res.json();
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },
  getMyCart : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/auth/profile`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
      })
      const data = await res.json();
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  }
}