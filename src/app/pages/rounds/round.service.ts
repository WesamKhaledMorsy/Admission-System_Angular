import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Round } from './round.model';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  Round =[];

  constructor(private http :HttpClient) { }

  public createRound (round :Round): Observable<Round []> {
    round.id  ;
    return this.http.post<Round[]>
        ('https://localhost:7147/api/Round/CreateNewRound',round);

  }

  public getRoundById(id:number) : Observable <any>{
    let url="https://localhost:7147/api/Round/GetRoundById";
    if (id!=0)
      url += `?id=${id}`

    return this.http.get<Round>(
      url
    );
  }

  public UpdateRound(round: Round): Observable<Round[]> {
    return this.http.put<Round[]>(
      "https://localhost:7147/api/Round/EditRound",
      round
    );
  }
}
