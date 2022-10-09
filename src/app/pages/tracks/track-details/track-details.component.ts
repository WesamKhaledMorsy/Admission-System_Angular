import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../track.model';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent implements OnInit {
  trackDetails : Track[] =[];
  TrackId :number;
  isAddMode :boolean;

  @Input() track : Track = new Track();
  @Output() trackUpdated = new EventEmitter<Track[]>();
  constructor(private  trackServices :TrackService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id =+params.get("id");
      this.TrackId=id;
      this.isAddMode =! id;
      if(id)
    {
      this.trackServices.getTrackById(id).subscribe((result)=>{
        debugger
        this.track.trackName=result[0].trackName;
        this.track.startDate=this.formatDate(result[0].startDate);
        this.track.endDate=this.formatDate(result[0].endDate);


        debugger
        console.log(result);
      }
    )

    }
    else if(id == 0){
      debugger
      this.track.id = 1;
      let id =this.track.id ;
      this.trackServices.getTrackById(id).subscribe((result)=>{
        this.track.trackName=result[0].trackName;
        this.track.startDate=result[0].startDate;
        this.track.endDate=result[0].endDate;

      debugger
       console.log(result);

      })
    }

    });

  }



 formatDate(date) {
    var d = new Date(date),
      day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  }


