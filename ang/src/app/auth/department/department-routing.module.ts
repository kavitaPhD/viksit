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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
