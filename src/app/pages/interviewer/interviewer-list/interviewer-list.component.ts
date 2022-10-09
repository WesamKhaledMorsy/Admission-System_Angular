import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Interview } from '../../interview/interview.model';
import { Round } from '../../rounds/round.model';
import { Interviewer } from '../interviewer.model';

@Component({
  selector: 'app-interviewer-list',
  templateUrl: './interviewer-list.component.html',
  styleUrls: ['./interviewer-list.component.scss']
})
export class InterviewerListComponent implements OnInit {

  selectInterviewers : Interviewer[];
  searchText :any;

  @Input() interviewer :Interviewer;
  @Output() interviewerUpdated =new EventEmitter<Interviewer>();
  constructor(private http : HttpClient,
    public formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getinterviewers();
    this._GetAllInterviewerData();
  }

  getinterviewers(){
    return this.http.get<any>('https://localhost:7147/api/Interviewer/GetInterviewers')
    .subscribe(data =>{
      this.selectInterviewers = data;
      console.log(this.selectInterviewers);
    })
  }

  getAllInterviewers(
    id:number,
    interviewerName:string,
    startDate:Date,
    endDate:Date,
    roundId:number,
    adminId:number,
    pageIndex:number,
    pageSize:number
  ): Observable <Interviewer[]>{
    let url=`https://localhost:7147/api/Interviewer/GetAllInterviewers/pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!=0) url+=`&id=${id}`;
    if(interviewerName!="") url+=`&roundName=${interviewerName}`;
    if(startDate !=null) url+= `&startDate=${startDate}`;
    if(endDate !=null) url+= `&endDate=${endDate}`;
    if(roundId!=0) url+=`&roundId=${roundId}`;
    if(adminId !=0) url+= `&adminId=${adminId}`;
    return this.http.get<Interviewer[]>(url);
  }

  interviewerId:number =0;
  interviewerName:string ="";
  startDate :Date;
  endDate :Date;
  roundId:number;
  adminId:number;
  _pageIndex =1;
  _pageSize=20;
  selectedinterviewers : Interviewer[];

  FilterInterviewers(){
    this.getAllInterviewers(
      this.interviewerId,
      this.interviewerName,
      this.startDate,
      this.endDate,
      this.roundId,
      this.adminId,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:any)=>
    {
      this.selectedinterviewers=result.values;
    })
  }

  public deleteInterviewer(interviewerId:number){
    let url ="https://localhost:7147/api/Interviewer/DeleteInterviewer";
    if(interviewerId !=0)
      url +=`?id=${interviewerId}`

      return this.http.delete<Interviewer>(url);

  }

  onDeleteInterviewer(interviewerId:number) {
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
          this.deleteInterviewer(interviewerId)
            .subscribe((_interviewer)=> {
              this.interviewerUpdated.emit(_interviewer);
              this.getinterviewers()
            });
            //!===============
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Interviewer has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Interviewer is safe :)',
            'error'
          );
        }
      }
      );
  }


  filteration: any | undefined = {} ;

  Reset(){
    this.filteration= {};
    this.FilterInterviewers();
  }

  interviews : Interview[];
  rounds : Round[];

  _GetAllInterviewerData():Observable<any>{
    let url ="https://localhost:7147/api/Interviewer/GetAllInterviewerData";
    return this.http.get<any>(url);
  }

  GetAllInterviewerData(){
    this._GetAllInterviewerData().subscribe((result : any)=> {

      this.interviews=result.rounds;
      debugger
    });

  }
}


