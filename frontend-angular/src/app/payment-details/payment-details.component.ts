import {Component, OnInit} from '@angular/core';
import {Payment} from "../model/Payment";
import {PaymentService} from "../services/payment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  pdfFileUrl!:string
  constructor(private paymentService:PaymentService,private act:ActivatedRoute) {
  }
  ngOnInit(): void {
    let mediaType:string = "application/pdf"
     this.paymentService.getPaymentById(this.act.snapshot.params['id']).subscribe({
       next:(data) => {
         let blob:Blob = new Blob([data],{type:mediaType});
         this.pdfFileUrl = window.URL.createObjectURL(blob);
       },
       error:err=>{
         console.log(err)
       }
     });
  }

  afterLoadComplete(event: any) {

  }
}
