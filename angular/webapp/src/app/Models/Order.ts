import { OrderItem } from "./OrderItem";

export class Order{
   order_Id?: string;
   userEmailId?: string;
   items?: OrderItem[];
   price?: number;
   status?: number;
   createdAt?: Date
   updatedAt?: Date
}