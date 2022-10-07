import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrackCreateComponent } from './track-create/track-create.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TracksComponent } from './tracks.component';



const routes : Routes=[
  {path:'createTrack',component: TrackCreateComponent},
  {path:'detailsTrack',component:TrackDetailsComponent},
  {path :'trackList',component:TrackListComponent},
  {path:':id/edit',component:TrackCreateComponent},
  {path:'**', redirectTo:'trackList'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
