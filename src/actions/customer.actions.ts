"use server"

import { customerService, EditInfo } from "@/services/customer.service"

export const getMyInfo = async() => {
  const res = await customerService.getMyInfo();
  return res;
}

export const editMyInfo = async({name, email} : EditInfo) => {
  const res = await customerService.editMyInfo({name,email});
  return res;
}