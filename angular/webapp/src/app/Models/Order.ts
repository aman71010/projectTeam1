import { OrderItem } from "./OrderItem";

export class Order{
   Order_Id?: string;
   UserEmailId?: string;
   Items?: OrderItem[];
   Price?: number;
   OrderStatus?: number;
   CreatedAt?: Date
   UpdatedAt?: Date
}