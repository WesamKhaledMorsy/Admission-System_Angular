import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  Student =[];
  constructor(private http :HttpClient) { }

  public createStudent (student :Student): Observable<Student []> {
    student.id  ;
    return this.http.post<Student[]>
        ('https://localhost:7147/api/Student/CreateNewStudent',student);

  }

  public getStudentById(id:number) : Observable <any>{
    let url="https://localhost:7147/api/Student/GetStudentById";
    if (id!=0)
      url += `?id=${id}`

    return this.http.get<Student>(
      url
    );
  }

  public UpdateStudent(student: Student): Observable<Student[]> {
    return this.http.put<Student[]>(
      "https://localhost:7147/api/Student/EditStudent",
      student
    );
  }
}


