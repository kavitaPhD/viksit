import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentdashboardComponent } from './departmentdashboard/departmentdashboard.component';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
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


@NgModule({
  declarations: [
    DepartmentdashboardComponent,
    StatusentryComponent,
    ViksitbookComponent,
    InitaitivealignmentComponent,
    EntryprogressComponent,
    NodaldetailsComponent,
    SchemeentryComponent,
    PolicyentryComponent,
    SubinitiativeentryComponent,
    InitiativemasterComponent,
    SchememasterComponent,
    NewinitaitiveComponent,
    AddkpiComponent,
    ProgresstrackingComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MdComponentModule,
  ]
})
export class DepartmentModule { }
