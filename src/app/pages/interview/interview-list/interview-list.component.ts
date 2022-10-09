import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Interviewer } from '../../interviewer/interviewer.model';
import { Round } from '../../rounds/round.model';
import { Interview } from '../interview.model';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  selectInterviews : Interview[];
  searchText :any;

  @Input() interview :Interview;
  @Output() interviewUpdated =new EventEmitter<Interview>();
  constructor(private http : HttpClient,
    public formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getInterviews();
    this._GetAllInterviewData();
  }

  getInterviews(){
    return this.http.get<any>('https://localhost:7147/api/Interview/GetInterviews')
    .subscribe(data =>{
      this.selectInterviews = data;
      console.log(this.selectInterviews);
    })
  }

  getAllInterviews(
    id:number,
    interviewName:string,
    startDate:Date,
    endDate:Date,
    roundId:number,
    adminId:number,
    pageIndex:number,
    pageSize:number
  ): Observable <Interview[]>{
    let url=`https://localhost:7147/api/Interview/GetAllInterviews/pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!=0) url+=`&id=${id}`;
    if(interviewName!="") url+=`&roundName=${interviewName}`;
    if(startDate !=null) url+= `&startDate=${startDate}`;
    if(endDate !=null) url+= `&endDate=${endDate}`;
    if(roundId!=0) url+=`&roundId=${roundId}`;
    if(adminId !=0) url+= `&adminId=${adminId}`;
    return this.http.get<Interview[]>(url);
  }

  interviewId:number =0;
  interviewName:string ="";
  startDate :Date;
  endDate :Date;
  roundId:number;
  adminId:number;
  _pageIndex =1;
  _pageSize=20;
  selectedinterviews : Interview[];

  FilterInterviews(){
    this.getAllInterviews(
      this.interviewId,
      this.interviewName,
      this.startDate,
      this.endDate,
      this.roundId,
      this.adminId,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:any)=>
    {
      this.selectedinterviews=result.values;
    })
  }

  public deleteInterview(interviewId:number){
    let url ="https://localhost:7147/api/Interview/DeleteInterview";
    if(interviewId !=0)
      url +=`?id=${interviewId}`

      return this.http.delete<Interview>(url);

  }

  onDeleteInterview(interviewId:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'question',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          //!main code for delete
          this.deleteInterview(interviewId)
            .subscribe((_interview)=> {
              this.interviewUpdated.emit(_interview);
              this.getInterviews()
            });
            //!===============
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Interview has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Interview is safe :)',
            'error'
          );
        }
      }
      );
  }


  filteration: any | undefined = {} ;

  Reset(){
    this.filteration= {};
    this.FilterInterviews();
  }

  interviewers : Interviewer[];
  rounds : Round[];

  _GetAllInterviewData():Observable<any>{
    let url ="https://localhost:7147/api/Interview/GetInterviewsData";
    return this.http.get<any>(url);
  }

  GetAllInterviewerData(){
    this._GetAllInterviewData().subscribe((result : any)=> {

      this.interviewers=result.interviewers;
      debugger
    });

  }
}


