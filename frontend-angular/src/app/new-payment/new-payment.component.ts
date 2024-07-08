import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {paymentStatus, paymentType} from "../model/Payment";
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../services/student.service";
import {timer} from "rxjs";
@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
    paymentTypes:string[] = [];
    paymentFormGroup!:FormGroup;
    pdfFileUrl!:string;
    showProgess:boolean = false;

    constructor(private fb:FormBuilder,private act:ActivatedRoute,private studentService:StudentService) {
      this.paymentFormGroup = fb.group({
        amount:fb.control(0.0),
        PaymentType:fb.control(''),
        date:fb.control(''),
        studentCode:fb.control(act.snapshot.params['code']),
        fileSource:fb.control(''),
        fileName:fb.control(''),
      })
    }

   public  savePayment = ()=>{
     this.showProgess = true;

     let date:Date = new Date(this.paymentFormGroup.value.date);
      let formattedDate:string = date.getDay()+'/'+((date.getMonth())+1)+'/'+date.getFullYear();

      let formData:FormData  = new FormData();
     formData.set("date",formattedDate);
     formData.set("amount",this.paymentFormGroup.value.amount);
     formData.set("file",this.paymentFormGroup.value.fileSource);
     formData.set("type",this.paymentFormGroup.value.PaymentType);
     formData.set("studentCode",this.paymentFormGroup.value.studentCode)
     this.studentService.savePaymentStudent(formData).subscribe({
       next:value => {
         this.showProgess = false;
         alert("Payment Save Successfully!");
       },
       error:err => {
         console.log(err)
       },

     })
   }

  ngOnInit(): void {
      for (let type in paymentType){
          let value = paymentType[type];
          if(typeof value === "string"){
            this.paymentTypes.push(value)
          }
      }
  }

  selectFile(event: any) {
    if(event.target.files.length > 0){
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource:file,
        fileName:file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file)
    }

  }

  afterLoadComplete(event:any) {
    console.log(event)
  }
}
