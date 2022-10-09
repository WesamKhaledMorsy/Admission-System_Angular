import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interview } from '../interview.model';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.scss']
})
export class InterviewDetailsComponent implements OnInit {

  InterviewDetails : Interview[] =[];
  InterviewId :number;
  isAddMode :boolean;

  @Input() interview : Interview = new Interview();
  @Output() interviewerUpdated = new EventEmitter<Interview[]>();
  constructor(private interviewServices :InterviewService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id =+params.get("id");
      this.InterviewId=id;
      this.isAddMode =! id;
      if(id)
    {
      this.interviewServices.getInterviewById(id).subscribe((result)=>{
        debugger
        this.interview.interviewName=result[0].interviewName;
        this.interview.startDate=this.formatDate(result[0].startDate);
        this.interview.endDate=this.formatDate(result[0].endDate);


        debugger
        console.log(result);
      }
    )

    }
    else if(id == 0){
      debugger
      this.interview.Id = 1;
      let id =this.interview.Id ;
      this.interviewServices.getInterviewById(id).subscribe((result)=>{
        this.interview.interviewName=result[0].trackName;
        this.interview.startDate=result[0].startDate;
        this.interview.endDate=result[0].endDate;

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



