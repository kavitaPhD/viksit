import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentdashboardComponent } from './departmentdashboard/departmentdashboard.component';
import { StatusentryComponent } from './statusentry/statusentry.component';
import { ViksitbookComponent } from './viksitbook/viksitbook.component';
import { InitaitivealignmentComponent } from './initaitivealignment/initaitivealignment.component';
import { EntryprogressComponent } from './entryprogress/entryprogress.component';
import { NodaldetailsComponent } from './nodaldetails/nodaldetails.component';
import { SchemeentryComponent } from './schemeentry/schemeentry.component';
import { PolicyentryComponent } from './policyentry/policyentry.component';
import { SubinitiativeentryComponent } from './subinitiativeentry/subinitiativeentry.component';
import { InitiativemasterComponent } from './initiativemaster/initiativemaster.component';
import { SchememasterComponent } from './schememaster/schememaster.component';
import { NewinitaitiveComponent } from './newinitaitive/newinitaitive.component';
import { AddkpiComponent } from './addkpi/addkpi.component';
import { ProgresstrackingComponent } from './progresstracking/progresstracking.component';
import { KpiadditionComponent } from './kpiaddition/kpiaddition.component';
import { KpimasterComponent } from './kpimaster/kpimaster.component';
import { KpiprogressentryComponent } from './kpiprogressentry/kpiprogressentry.component';
import { KpiprogressdashboardComponent } from './kpiprogressdashboard/kpiprogressdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminthemedashboardComponent } from './adminthemedashboard/adminthemedashboard.component';
import { CmdashboardComponent } from './cmdashboard/cmdashboard.component';

const routes: Routes = [
  {
    path: 'viksitdocument',
    component: ViksitbookComponent
  },
  {
    path: 'departmentdashboard',
    component: DepartmentdashboardComponent
  },
  {
    path: 'statusentry',
    component: StatusentryComponent
  },
  {
    path: 'initiativealign',
    component: InitaitivealignmentComponent
  },
  {
    path: 'progressentry',
    component: EntryprogressComponent
  },
  {
    path: 'nodalentry',
    component: NodaldetailsComponent
  },
  {
    path: 'schemeentry/:initaitiveid',
    component: SchemeentryComponent
  },
  {
    path: 'policyentry',
    component: PolicyentryComponent
  },
  {
    path:'subinitiativeentry',
    component:SubinitiativeentryComponent
  },
  {
    path: 'initiativemaster',
    component: InitiativemasterComponent
  },
  {
    path: 'schememaster',
    component: SchememasterComponent
  },
  {
    path: 'newinitiative',
    component: NewinitaitiveComponent
  },
  {
    path: 'addkpi/:initaitiveid',
    component: AddkpiComponent
  },
  {
    path: 'progresstracking/:initaitiveid',
    component: ProgresstrackingComponent
  },
  {
    path: 'kpiaddition',
    component: KpiadditionComponent
  },
  {
    path: 'kpimaster',
    component: KpimasterComponent
  }, 
  {
    path: 'kpiprogressentry',
    component: KpiprogressentryComponent
  },
  {
    path: 'kpiprogressdashboard',
    component: KpiprogressdashboardComponent
  },  
  {
    path: 'admindashboard',
    component: AdmindashboardComponent
  },
  {
    path: 'adminthemedashboard',
    component: AdminthemedashboardComponent
  },
  {
    path: 'cmdashboard',
    component: CmdashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
