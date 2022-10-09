import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Track } from './track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  Track =[];
  constructor(private http :HttpClient) { }

  public createTrack (track :Track): Observable<Track []> {
    track.id  ;
    return this.http.post<Track[]>
        ('https://localhost:7147/api/Track/CreateNewTrack',track);

  }

  public getTrackById(id:number) : Observable <any>{
    let url="https://localhost:7147/api/Track/GetTrackById";
    if (id!=0)
      url += `?id=${id}`

    return this.http.get<Track>(
      url
    );
  }

  public UpdateTrack(track: Track): Observable<Track[]> {
    return this.http.put<Track[]>(
      "https://localhost:7147/api/Track/EditTrack",
      track
    );
  }
}
