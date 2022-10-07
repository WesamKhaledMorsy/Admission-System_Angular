import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoundCreateComponent } from './round-create/round-create.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { RoundListComponent } from './round-list/round-list.component';

const routes : Routes=[
  {path:'createRound',component: RoundCreateComponent},
  {path:'detailsRound',component:RoundDetailsComponent},
  {path :'roundList',component:RoundListComponent},
  {path:'', redirectTo:'roundList'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class RoundsRoutingModule { }
