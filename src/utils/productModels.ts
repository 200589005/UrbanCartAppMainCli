export interface Product {
    _id: string;
    image: string;
    description: string;
    title: string;
  }
  
  export interface OrderItem {
    image: string;
    description: string;
    title: string;
    count: number;
  }
  
  export interface Address {
    streetAddress: string;
    city: string;
    province: string;
    postalcode: string;
  }
  
  export interface Order {
    _id: string;
    productItems: OrderItem[];
    address: Address;
    email: string;
    date: string;
    __v: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }