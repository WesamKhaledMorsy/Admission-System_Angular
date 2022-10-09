import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../interview/interview.service';
import { Interviewer } from '../interviewer.model';
import { InterviewerService } from '../interviewer.service';

@Component({
  selector: 'app-interviewer-details',
  templateUrl: './interviewer-details.component.html',
  styleUrls: ['./interviewer-details.component.scss']
})
export class InterviewerDetailsComponent implements OnInit {

  InterviewerDetails : Interviewer[] =[];
  InterviewerId :number;
  isAddMode :boolean;

  @Input() interviewer : Interviewer = new Interviewer();
  @Output() interviewerUpdated = new EventEmitter<Interviewer[]>();
  constructor(private interviewerServices :InterviewerService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id =+params.get("id");
      this.InterviewerId=id;
      this.isAddMode =! id;
      if(id)
    {
      this.interviewerServices.getInterviewerById(id).subscribe((result)=>{
        debugger
        this.interviewer.interviewerName=result[0].interviewerName;
        this.interviewer.startDate=this.formatDate(result[0].startDate);
        this.interviewer.endDate=this.formatDate(result[0].endDate);


        debugger
        console.log(result);
      }
    )

    }
    else if(id == 0){
      debugger
      this.interviewer.id = 1;
      let id =this.interviewer.id ;
      this.interviewerServices.getInterviewerById(id).subscribe((result)=>{
        this.interviewer.interviewName=result[0].trackName;
        this.interviewer.startDate=result[0].startDate;
        this.interviewer.endDate=result[0].endDate;

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



