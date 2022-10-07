import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewCreateComponent } from './interview-create/interview-create.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewRoutingModule } from './interview-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    InterviewCreateComponent,
    InterviewListComponent,
    InterviewDetailsComponent
  ],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DropzoneModule
  ]
})
export class InterviewModule { }
