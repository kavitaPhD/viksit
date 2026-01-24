import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsRoutingModule } from './cs-routing.module';
import { CsdashboardComponent } from './csdashboard/csdashboard.component';
import { MdComponentModule } from 'src/app/md-components/md-components.module';


@NgModule({
  declarations: [
    CsdashboardComponent
  ],
  imports: [
    CommonModule,
    CsRoutingModule,
    MdComponentModule,
  ]
})
export class CsModule { }
