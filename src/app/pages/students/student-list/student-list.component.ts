import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Round } from '../../rounds/round.model';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  selectStudents : Student[];
  searchText :any;

  @Input() student :Student;
  @Output() studentUpdated =new EventEmitter<Student>();
  constructor(private http : HttpClient,
    public formBuilder : FormBuilder) { }


  ngOnInit(): void {
    debugger
    this.getStudents();
    this._GetAllStudentData();
  }

  getStudents(){
    return this.http.get<any>('https://localhost:7147/api/Student/GetStudents')
    .subscribe(data =>{
      this.selectStudents = data;
      console.log(this.selectStudents);
    })
  }
  getAllStudents(
    id:number,
    name:string ,
    PhoneNubmer : string,
    email :string,
    status: string,
    university :string,
    graduationYear: string,
    grade : number ,
    pageIndex:number,
    pageSize:number
  ): Observable <Student[]>{
    let url=`https://localhost:7147/api/Student/GetAllStudent/pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!=0) url+=`&id=${id}`;
    if(name!="") url+=`&name=${name}`;
    if(PhoneNubmer !=null) url+= `&phonenumber=${PhoneNubmer}`;
    if(email !=null) url+= `&email=${email}`;
    if(status!=null) url+=`&status=${status}`;
    if(university !=null) url+= `&university=${university}`;
    if(graduationYear !=null) url+= `&graduationYear=${graduationYear}`;
    if(grade !=0) url+= `&grade=${grade}`;
    return this.http.get<Student[]>(url);

  }

  studentId:number =0;
  name:string ="";
  PhoneNubmer : string="";
  email :string="";
  status: string="";
  university :string="";
  graduationYear: string="";
  grade : number =0;
  _pageIndex =1;
  _pageSize=20;

  selectedStudents : Student[];

  FilterStudents(){
    this.getAllStudents(
      this.studentId,
      this.name,
      this.PhoneNubmer,
      this.email,
      this.status,
      this.university,
      this.graduationYear,
      this.grade,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:any)=>
    {
      this.selectedStudents=result.values;
    })
  }

  public deleteStudent(studentId:number){
    let url ="https://localhost:7147/api/Student/DeleteStudent";
    if(studentId !=0)
      url +=`?id=${studentId}`

      return this.http.delete<Student>(url);

  }

  onDeleteStudent(studentId:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'question',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          //!main code for delete
          this.deleteStudent(studentId)
            .subscribe((_student)=> {
              this.studentUpdated.emit(_student);
              this.getStudents()
            });
            //!===============
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Student has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Student is safe :)',
            'error'
          );
        }
      }
      );
  }


  filteration: any | undefined = {} ;

  Reset(){
    this.filteration= {};
    this.FilterStudents();
  }

  students : Student[];
  rounds : Round[];

  _GetAllStudentData():Observable<any>{
    let url ="https://localhost:7147/api/Student/GetStudentsData";
    return this.http.get<any>(url);
  }

  GetAllStudentrData(){
    this._GetAllStudentData().subscribe((result : any)=> {

      this.students=result.students;
      debugger
    });

  }
}




