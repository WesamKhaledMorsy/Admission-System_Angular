import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentsRoutingModule } from './students-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    StudentCreateComponent,
    StudentListComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DropzoneModule
  ]
})
export class StudentsModule { }
