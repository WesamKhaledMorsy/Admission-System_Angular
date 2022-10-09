import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Interview } from './interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  Interview =[];
  constructor(private http :HttpClient) { }

  public createInterview (interview :Interview): Observable<Interview []> {
    interview.Id  ;
    return this.http.post<Interview[]>
        ('https://localhost:7147/api/Interview/CreateNewInterview',interview);

  }

  public getInterviewById(id:number) : Observable <any>{
    let url="https://localhost:7147/api/Interview/GetInterviewById";
    if (id!=0)
      url += `?id=${id}`

    return this.http.get<Interview>(
      url
    );
  }

  public UpdateInterview(interview: Interview): Observable<Interview[]> {
    return this.http.put<Interview[]>(
      "https://localhost:7147/api/Interview/EditInterview",
      interview
    );
  }
}


