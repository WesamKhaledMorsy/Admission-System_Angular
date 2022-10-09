import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Interviewer } from './interviewer.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  Interviewer =[];
  constructor(private http :HttpClient) { }

  public createInterviewer (interviewer :Interviewer): Observable<Interviewer []> {
    interviewer.id  ;
    return this.http.post<Interviewer[]>
        ('https://localhost:7147/api/Interviewer/CreateNewInterviewer',interviewer);

  }

  public getInterviewerById(id:number) : Observable <any>{
    let url="https://localhost:7147/api/Interviewer/GetInterviewerById";
    if (id!=0)
      url += `?id=${id}`

    return this.http.get<Interviewer>(
      url
    );
  }

  public UpdateInterviewer(interviewer: Interviewer): Observable<Interviewer[]> {
    return this.http.put<Interviewer[]>(
      "https://localhost:7147/api/Interviewer/EditInterviewer",
      interviewer
    );
  }
}


