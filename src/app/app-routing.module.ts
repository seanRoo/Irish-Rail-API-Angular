import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrainTimesComponent} from './train-times/train-times.component';

const routes: Routes = [
  {path:'trains', component: TrainTimesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
