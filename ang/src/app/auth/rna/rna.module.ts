import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RnaRoutingModule } from './rna-routing.module';
import { RnadashboardComponent } from './rnadashboard/rnadashboard.component';
import { MdComponentModule } from 'src/app/md-components/md-components.module';


@NgModule({
  declarations: [
    RnadashboardComponent
  ],
  imports: [
    CommonModule,
    RnaRoutingModule,
    MdComponentModule,
  ]
})
export class RnaModule { }
