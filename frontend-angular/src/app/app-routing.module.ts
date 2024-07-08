import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StudentDetailComponent} from "./student-detail/student-detail.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";

const routes: Routes = [
  {path : "", component : AdminTemplateComponent},
  {path : "login", component : LoginComponent},
  {path : "admin", component : AdminTemplateComponent,
    canActivate : [AuthGuard],
    children : [
      {path : "home", component : LoginComponent},
      {path : "profile", component : ProfileComponent},
      {path : "student", component : StudentsComponent},
      {path : "payment", component : PaymentsComponent},
      {path : "dashboard", component : DashboardComponent},
      {path : "student-details/:code", component : StudentDetailComponent},
      {path : "new-payment/:code", component : NewPaymentComponent},
      {path : "payment-details/:id", component : PaymentDetailsComponent},

      {
        path : "loadStudents", component : LoadStudentsComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {
        path : "loadPayments", component : LoadPaymentsComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },

    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
