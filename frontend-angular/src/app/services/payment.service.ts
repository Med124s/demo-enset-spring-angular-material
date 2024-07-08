import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment} from "../model/Payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  public getPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(environment.host+"/payments");
  }

  public getPaymentById( id:number){
    return this.http.get(environment.host+"/payments/"+id+"/file",{responseType:"blob"});
  }

  public savePayment = (payment:Payment)=>{
    return this.http.post(`${environment.host}/payments`,payment)
  }

}
