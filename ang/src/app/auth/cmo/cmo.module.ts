import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmoRoutingModule } from './cmo-routing.module';
import { CmodashboardComponent } from './cmodashboard/cmodashboard.component';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
import { ThemeinitiativeComponent } from './themeinitiative/themeinitiative.component';
import { DeptinitiativeComponent } from './deptinitiative/deptinitiative.component';
import { ThemewiseprogressComponent } from './themewiseprogress/themewiseprogress.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InitiativedetailsComponent } from './initiativedetails/initiativedetails.component';
import { DeptinitiativedetailsComponent } from './deptinitiativedetails/deptinitiativedetails.component';


@NgModule({
  declarations: [
    CmodashboardComponent,
    ThemeinitiativeComponent,
    DeptinitiativeComponent,
    ThemewiseprogressComponent,
    InitiativedetailsComponent,
    DeptinitiativedetailsComponent    
  ],
  imports: [
    CommonModule,
    CmoRoutingModule,
    MdComponentModule,
    NgApexchartsModule 
  ]
})
export class CmoModule { }
