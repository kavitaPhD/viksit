import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries, ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive, ApexMarkers, ApexAnnotations,
  ApexGrid
} from "ng-apexcharts";
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cmodashboard',
  templateUrl: './cmodashboard.component.html',
  styleUrls: ['./cmodashboard.component.scss']
})

export class CmodashboardComponent implements OnInit 
{  
  public cmodashboard!: FormGroup; 
  public departmentwiseinitiativelist: any = [];

  constructor(private router: Router, private fb: FormBuilder, public ds: DataService,
    private authService: AuthService, private route: ActivatedRoute, private dp: DatePipe
  ) { }

  ngOnInit(): void 
  {
    this.cmodashboard = this.fb.group({
    });
    this.getdepartmentwiseshortterm();
  }

  getdepartmentwiseshortterm()
  {
    this.ds.getData('common/getshorttermcount').subscribe((res: any) => 
    {
      this.departmentwiseinitiativelist = res;
    });
  }


  getPercentage(completed: number, total: number): number 
  {
    if (!total) return 0;
    return Math.round((completed / total) * 100);
  }


  onSubmit()
  {

  }


}
