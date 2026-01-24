import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RnadashboardComponent } from './rnadashboard/rnadashboard.component';

const routes: Routes = [

  {
    path: 'rnadashboard',
    component: RnadashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RnaRoutingModule { }
