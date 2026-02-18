
export interface Route {
  title : string;
  items : {
    title : string;
    url : string;
  }[];
}
export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface Order {
  id : string,
  quantity : number,
  totalAmount : number,
  status : OrderStatus
}

export interface MedicinePost {
  id : string | number,
  name : string,
  price : number,
  stock : number,
  categoryId : string,
  categoryName : string,
  createdAt : string,
  updatedAt : string,
  orders : Order[]
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  orders: any[];
}
export interface CreateNewMedicine {
  name : string,
  category : string,
  price : number,
  stock : number
}
export interface Orders  {
  id?: string;
  totalAmount?: number;
  quantity?: number;
  userId?: string;
  medicineId?: string;
  status?: string;
  shippingAddress?: string | null;
  createdAt?: string;
}

export interface OrdersResponse {
  data: Orders[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}
