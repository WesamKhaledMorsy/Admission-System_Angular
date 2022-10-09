import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Interviewer } from '../../interviewer/interviewer.model';
import { Student } from '../../students/student.model';
import { Interview } from '../interview.model';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-create',
  templateUrl: './interview-create.component.html',
  styleUrls: ['./interview-create.component.scss']
})
export class InterviewCreateComponent implements OnInit {

  interviewData :Interview[];

  interviewers : Interviewer[];
  students : Student[];

  newtInterview :Interview;
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean;        //?  write AddMode to check if we are in edit mode or Add mode
  InterviewId :number;

   @Input() interviewInput : Interview = new Interview();
   @Output() interviewUpdated= new EventEmitter <Interview[]>();

   @Input() fromDate: Date;
   @Input() toDate: Date;
   @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
   @ViewChild('dp', { static: true }) datePicker: any;
   constructor(private http :HttpClient,
     private interviewServices : InterviewService ,
     private route:ActivatedRoute,
     ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const id =+params.get("id");
      this.InterviewId=id;
      this.isAddMode =! id;
      if(id)
    {
      this.interviewServices.getInterviewById(id).subscribe((result)=>{

        debugger
        this.interviewInput.interviewName=result[0].interviewName;
        this.interviewInput.startDate=this.formatDate(result[0].startDate);
        this.interviewInput.endDate=this.formatDate(result[0].endDate);
        this.interviewInput.studentId=result[0].studentId;
        this.interviewInput.interviewerId=result[0].interviewerId;
        this.interviewInput.adminId=result[0].adminId;
        console.log(result);
      }
    );
    }
    });
    this.GetAllInterviewData();
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
      let interview = new Interview();
        interview.Id =0 ;
        interview.interviewName = form.value.interviewName;
        interview.startDate = form.value.startDate;
        interview.endDate = form.value.endDate;
        interview.studentId=form.value.studentId;
        interview.interviewerId=form.value.interviewerId;
        interview.adminId = form.value.adminId;
        debugger
      this.http.post<any>
        ('https://localhost:7147/api/Interview/CreateNewInterview',
        interview).subscribe(data => {
          console.log(data)

          //!==
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Interview created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      //!==
      })


    }
    else{
      this.interviewInput.Id=this.InterviewId;
      this.interviewServices.UpdateInterview(this.interviewInput)
          .subscribe((UpInterview)=>{
          this.interviewUpdated.emit(UpInterview);
      }, )

      //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Interview Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
    //!==
    }
        form.reset(this.interviewInput);
  }

  _GetAllInterviewData():Observable<any>{
    let url ="https://localhost:7147/api/Interview/GetInterviewsData";
    return this.http.get<any>(url);
  }

  GetAllInterviewData(){
    this._GetAllInterviewData().subscribe((result : any)=> {

      this.interviewers=result.interviewers;
      this.students=result.students;
      debugger
    });

  }
  }

