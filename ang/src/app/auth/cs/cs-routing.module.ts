import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsdashboardComponent } from './csdashboard/csdashboard.component';

const routes: Routes = [
  {
    path: 'csdashboard',
    component: CsdashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsRoutingModule { }
