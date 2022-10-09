import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Round } from '../../rounds/round.model';
import { Track } from '../track.model';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.scss']
})
export class TrackCreateComponent implements OnInit {

  trackData :Track[];

  rounds : Round[];

  newtrack :Track;
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean;        //?  write AddMode to check if we are in edit mode or Add mode
  TrackId :number;

   @Input() trackInput : Track = new Track();
   @Output() trackUpdated= new EventEmitter <Track[]>();

   @Input() fromDate: Date;
   @Input() toDate: Date;
   @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
   @ViewChild('dp', { static: true }) datePicker: any;
   constructor(private http :HttpClient,
     private trackServices : TrackService ,
     private route:ActivatedRoute,
     ) { }

  ngOnInit(): void {
  // Catch the Id from  URL
  this.route.paramMap.subscribe((params)=>{
    const id =+params.get("id");
    this.TrackId=id;
    this.isAddMode =! id;
    if(id)
  {
    this.trackServices.getTrackById(id).subscribe((result)=>{

      debugger
      this.trackInput.trackName=result[0].trackName;
      this.trackInput.startDate=this.formatDate(result[0].startDate);
      this.trackInput.endDate=this.formatDate(result[0].endDate);
      this.trackInput.roundId=result[0].roundId;
      this.trackInput.adminId=result[0].adminId;
      console.log(result);
    }
  );
  }
  });
  this.GetAllTrackData();
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

onSubmit(form:NgForm){
  if(this.isAddMode){
    let track = new Track();
      track.id =0 ;
      track.trackName = form.value.roundName;
      track.startDate = form.value.startDate;
      track.endDate = form.value.endDate;
      track.roundId=form.value.roundId;
      track.adminId = form.value.adminId;
      debugger
    this.http.post<any>
      ('https://localhost:7147/api/Track/CreateNewTrack',track).subscribe(data => {
        console.log(data)

        //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Track created Successfully',
        showConfirmButton: false,
        timer: 1500
      });
    //!==
    })


  }
  else{
    this.trackInput.id=this.TrackId;
    this.trackServices.UpdateTrack(this.trackInput)
        .subscribe((Uptrack)=>{
        this.trackUpdated.emit(Uptrack);
    }, )

    //!==
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Track Updated Successfully',
      showConfirmButton: false,
      timer: 1500
    });
  //!==
  }
      form.reset(this.trackInput);
}

_GetAllTrackData():Observable<any>{
  let url ="https://localhost:7147/api/Track/GetAllTrackData";
  return this.http.get<any>(url);
}

GetAllTrackData(){
  this._GetAllTrackData().subscribe((result : any)=> {

    this.rounds=result.rounds;
    debugger
  });

}
}
