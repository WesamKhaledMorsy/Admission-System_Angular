import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackCreateComponent } from './track-create/track-create.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TracksRoutingModule } from './tracks-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [
    TrackCreateComponent,
    TrackDetailsComponent,
    TrackListComponent
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DropzoneModule
  ]
})
export class TracksModule { }
