import {Component, OnInit} from '@angular/core';
import {Payment} from "../model/Payment";
import {StudentService} from "../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit{
  studentPayments:Payment[] = [];
  studentCode!:string;
  public displayedColumns = ['id','date','type','status','amount','firstName','details'];
  paymentDataSource!:MatTableDataSource<Payment>
  constructor(private studentService:StudentService,
              private act:ActivatedRoute,
              private router:Router) {
  }
  ngOnInit(): void {
    this.studentCode = this.act.snapshot.params["code"];
    this.getPaymentsStudent(this.studentCode);
  }

  public getPaymentsStudent(code:string){
    return this.studentService.getStudentPayments(code).subscribe({
      next:(payments:Payment[])=>{
        this.studentPayments = payments;
        this.paymentDataSource = new MatTableDataSource<Payment>(this.studentPayments);
        console.log(payments);
      },
      error:err => {
        console.log(err);
      }
    })
  }


  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
  }

  paymentDetails(element:Payment) {
    this.router.navigateByUrl("/admin/payment-details/"+element.id)
  }
}
