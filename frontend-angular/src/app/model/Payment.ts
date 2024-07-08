import {Student} from "./Student";

export enum paymentStatus {
  CREATED, VALIDATED, REJECTED
}
export enum paymentType {
  CASH, CHECK, TRANSFER, DEPOSIT
}
export interface Payment {
  id:number,
  code:string,
  amount:number,
  date:Date,
  file:string,
  paymentStatus:paymentStatus,
  paymentType:paymentType,
  student:Student

}
