import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterviewCreateComponent } from './interview-create/interview-create.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewListComponent } from './interview-list/interview-list.component';


const routes : Routes=[
  {path:'createInterview',component: InterviewCreateComponent},
  {path :'interviewlist',component:InterviewListComponent},
  {path:'edit/:id',component:InterviewCreateComponent},
  {path:'detailsInterview/:id' , component:InterviewDetailsComponent},
  {path:'', redirectTo:'interviewlist',pathMatch:'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
