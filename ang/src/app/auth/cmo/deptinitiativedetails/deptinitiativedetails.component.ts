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
  selector: 'app-deptinitiativedetails',
  templateUrl: './deptinitiativedetails.component.html',
  styleUrls: ['./deptinitiativedetails.component.scss']
})
export class DeptinitiativedetailsComponent implements OnInit {

  public departmentwiseinitiativeprogress!: FormGroup;
  public deptId!: number;
  public departmentwiseinitiativelist: any = []; public departmentname: any; public totalinitiative: any; 

  public initiativedetails: any = [];

  constructor(private router: Router, private fb: FormBuilder, public ds: DataService,
    private authService: AuthService, private route: ActivatedRoute, private dp: DatePipe
  ) { }

  ngOnInit(): void 
  {

    this.departmentwiseinitiativeprogress = this.fb.group({
    });

    this.route.queryParams.subscribe(params => {
      this.deptId = Number(params['deptId']);
      this.getdepartmentdata(this.deptId);
      this.getinitiativedetails(this.deptId);
      this.gettotalinitiative(this.deptId);
    });
   
  }

  getdepartmentdata(deptid: any) {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  gettotalinitiative(deptid: any) {
    this.ds.paramFunction('common/gettotalinitiative', deptid).subscribe((res: any) => {
      this.totalinitiative = res[0]?.totalinitiative;
    });
  }

  getinitiativedetails(deptid: any) {
    this.ds.paramFunction('common/getdeptwise_shortterminitiative', deptid).subscribe((res: any) => {
      this.initiativedetails = res;
    });
  }

}
