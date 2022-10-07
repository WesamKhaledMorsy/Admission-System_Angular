import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundCreateComponent } from './round-create/round-create.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { RoundListComponent } from './round-list/round-list.component';
import { RoundsRoutingModule } from './rounds-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    RoundCreateComponent,
    RoundDetailsComponent,
    RoundListComponent
  ],
  imports: [
    CommonModule,
    RoundsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DropzoneModule
  ]
})
export class RoundsModule { }
