import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Round } from '../round.model';
import { RoundService } from '../round.service';

@Component({
  selector: 'app-round-details',
  templateUrl: './round-details.component.html',
  styleUrls: ['./round-details.component.scss']
})
export class RoundDetailsComponent implements OnInit {

  roundDetails : Round[] =[];
  RoundId :number;
  isAddMode :boolean;

  @Input() round : Round = new Round();
  @Output() roundUpdated = new EventEmitter<Round[]>();
  constructor(private roundServices :RoundService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id =+params.get("id");
      this.RoundId=id;
      this.isAddMode =! id;
      if(id)
    {
      this.roundServices.getRoundById(id).subscribe((result)=>{
        debugger
        this.round.roundName=result[0].roundName;
        this.round.startDate=this.formatDate(result[0].startDate);
        this.round.endDate=this.formatDate(result[0].endDate);
        this.round.startAdmission=this.formatDate(result[0].startAdmission);
        this.round.endAdmission=this.formatDate(result[0].endAdmission);

        debugger
        console.log(result);
      }
    )

    }
    else if(id == 0){
      debugger
      this.round.id = 1;
      let id =this.round.id ;
      this.roundServices.getRoundById(id).subscribe((result)=>{
        this.round.roundName=result[0].roundName;
        this.round.startDate=result[0].startDate;
        this.round.endDate=result[0].endDate;
        this.round.startAdmission=result[0].startAdmission;
        this.round.endAdmission=result[0].endAdmission;
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


