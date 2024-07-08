import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Student} from "../model/Student";
import {Payment} from "../model/Payment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http:HttpClient) { }

  public getStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(environment.host+"/students");
  }

  public getStudentPayments(code:string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.host}/students/${code}/payments`);
  }

  public savePaymentStudent(formData:any):Observable<Payment>{
    return this.http.post<Payment>(`${environment.host}/payments`,formData);
  }
}
