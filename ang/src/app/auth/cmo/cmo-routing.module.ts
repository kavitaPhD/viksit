import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmodashboardComponent } from './cmodashboard/cmodashboard.component';
import { DeptinitiativeComponent } from './deptinitiative/deptinitiative.component';
import { ThemeinitiativeComponent } from './themeinitiative/themeinitiative.component';
import { ThemewiseprogressComponent } from './themewiseprogress/themewiseprogress.component';
import { InitiativedetailsComponent } from './initiativedetails/initiativedetails.component';
import { DeptinitiativedetailsComponent } from './deptinitiativedetails/deptinitiativedetails.component';

const routes: Routes = [
  {
    path: 'cmodashboard',
    component: CmodashboardComponent
  },
  {
    path: 'cmodeptinitiative',
    component: DeptinitiativeComponent
  },
  {
    path: 'cmothemeinitiative',
    component: ThemeinitiativeComponent
  },
  {
    path: 'themewiseprogress',
    component: ThemewiseprogressComponent
  },
  {
    path: 'initiativedetails',
    component: InitiativedetailsComponent
  },
  {
    path: 'deptinitiativedetails',
    component: DeptinitiativedetailsComponent    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmoRoutingModule { }
