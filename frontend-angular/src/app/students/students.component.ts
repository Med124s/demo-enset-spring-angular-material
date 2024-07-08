import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {StudentService} from "../services/student.service";
import {Student} from "../model/Student";
import {Payment} from "../model/Payment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit{
  public students : Student[] = [];
  public displayedColumns = ['id','code','firstName','lastName','programId','payments'];

  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  constructor(private studentService : StudentService,
              private router:Router) {
  }
  ngOnInit() {
    this.studentService.getStudents()
      .subscribe({
        next : (value:Student[]) => {
          this.students = value;
          console.log(this.students);
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : err => {
          console.log(err);
        }
      })
  }
  ngAfterViewInit() {

  }

  studentPayments(student:Student) {
      this.router.navigateByUrl("/admin/student-details/"+student.code);

  }
}
