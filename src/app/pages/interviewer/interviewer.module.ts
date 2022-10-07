import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewerCreateComponent } from './interviewer-create/interviewer-create.component';
import { InterviewerListComponent } from './interviewer-list/interviewer-list.component';
import { InterviewerDetailsComponent } from './interviewer-details/interviewer-details.component';
import { InterviewerRoutingModule } from './interviewer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    InterviewerCreateComponent,
    InterviewerListComponent,
    InterviewerDetailsComponent
  ],
  imports: [
    CommonModule,
    InterviewerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DropzoneModule
  ]
})
export class InterviewerModule { }
