import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes :Routes =[
  {path:'createStudent',component:StudentCreateComponent},
  {path:'studentList',component:StudentListComponent},
  {path:'studentProfile',component:StudentProfileComponent},
  {path:'edit/:id',component:StudentCreateComponent},
  {path:'',redirectTo:'studentList',pathMatch:'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
