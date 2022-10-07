import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterviewerCreateComponent } from './interviewer-create/interviewer-create.component';
import { InterviewerDetailsComponent } from './interviewer-details/interviewer-details.component';
import { InterviewerListComponent } from './interviewer-list/interviewer-list.component';

const routes : Routes=[
  {path:'createInterviewer',component: InterviewerCreateComponent},
  {path:'detailsInterviewer',component:InterviewerDetailsComponent},
  {path :'interviewerList',component:InterviewerListComponent},
  {path:':id/edit',component:InterviewerCreateComponent},
  {path:'', redirectTo:'interviewerList'}
]

@NgModule({
  // declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InterviewerRoutingModule { }
