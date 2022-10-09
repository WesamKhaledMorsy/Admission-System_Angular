import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Interview } from '../../interview/interview.model';
import { Round } from '../../rounds/round.model';
import { Student } from '../../students/student.model';
import { Interviewer } from '../interviewer.model';
import { InterviewerService } from '../interviewer.service';

@Component({
  selector: 'app-interviewer-create',
  templateUrl: './interviewer-create.component.html',
  styleUrls: ['./interviewer-create.component.scss']
})
export class InterviewerCreateComponent implements OnInit {
  interviewerData :Interviewer[];

  interviews : Interview[];
  students : Student[];

  newtInterviewer :Interviewer;
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean;        //?  write AddMode to check if we are in edit mode or Add mode
  InterviewerId :number;

   @Input() interviewerInput : Interviewer = new Interviewer();
   @Output() interviewerUpdated= new EventEmitter <Interviewer[]>();

   @Input() fromDate: Date;
   @Input() toDate: Date;
   @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
   @ViewChild('dp', { static: true }) datePicker: any;
   constructor(private http :HttpClient,
     private interviewerServices : InterviewerService ,
     private route:ActivatedRoute,
     ) { }

  ngOnInit(): void {
  // Catch the Id from  URL
  this.route.paramMap.subscribe((params)=>{
    const id =+params.get("id");
    this.InterviewerId=id;
    this.isAddMode =! id;
    if(id)
  {
    this.interviewerServices.getInterviewerById(id).subscribe((result)=>{

      debugger
      this.interviewerInput.interviewName=result[0].interviewerName;
      this.interviewerInput.startDate=this.formatDate(result[0].startDate);
      this.interviewerInput.endDate=this.formatDate(result[0].endDate);
      //this.interviewerInput.roundId=result[0].roundId;
      this.interviewerInput.adminId=result[0].adminId;
      console.log(result);
    }
  );
  }
  });
  this.GetAllInterviewerData();
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
    let interviewer = new Interviewer();
      interviewer.id =0 ;
      interviewer.interviewerName = form.value.interviewerName;
      interviewer.startDate = form.value.startDate;
      interviewer.endDate = form.value.endDate;
      //interviewer.roundId=form.value.roundId;
      interviewer.adminId = form.value.adminId;
      debugger
    this.http.post<any>
      ('https://localhost:7147/api/Interviewer/CreateNewInterviewer',interviewer).subscribe(data => {
        console.log(data)

        //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Interviewer created Successfully',
        showConfirmButton: false,
        timer: 1500
      });
    //!==
    })


  }
  else{
    this.interviewerInput.id=this.InterviewerId;
    this.interviewerServices.UpdateInterviewer(this.interviewerInput)
        .subscribe((UpInterviewer)=>{
        this.interviewerUpdated.emit(UpInterviewer);
    }, )

    //!==
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Interviewer Updated Successfully',
      showConfirmButton: false,
      timer: 1500
    });
  //!==
  }
      form.reset(this.interviewerInput);
}

_GetAllInterviewerData():Observable<any>{
  let url ="https://localhost:7147/api/Interviewer/GetInterviewersData";
  return this.http.get<any>(url);
}

GetAllInterviewerData(){
  this._GetAllInterviewerData().subscribe((result : any)=> {

    this.interviews=result.interviews;
    this.students=result.students;
    debugger
  });

}
}

