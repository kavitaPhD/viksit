import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schemeentry',
  templateUrl: './schemeentry.component.html',
  styleUrls: ['./schemeentry.component.scss']
})
export class SchemeentryComponent implements OnInit 
{
  public progresstrackingForm!: FormGroup; public selecteddinitiativeid: any;
  public selecteddinitiativename: any; public departmentname: any;
  public kpidata: any = []; public kpiRowCount: any; public departmentData: any[] = [];


  constructor(private router: Router, private fb: FormBuilder, public ds: DataService,
    private authService: AuthService, private route: ActivatedRoute, private dp: DatePipe
  ) { }

  ngOnInit(): void {
    this.progresstrackingForm = this.fb.group
      ({
        currentstatus: ["0", Validators.required],
      });

    let user = this.authService.currentUser;
    this.selecteddinitiativeid = this.route.snapshot.paramMap.get('initaitiveid');
    this.getdepartmentdata(user.dept_id);
    this.getinitiativedetails(this.selecteddinitiativeid);
    this.getkpidata(this.selecteddinitiativeid)
  }

  getdepartmentdata(deptid: any) {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  getinitiativedetails(selecteddinitiative: any) {
    this.ds.paramFunction('common/getinitiativedata', selecteddinitiative).subscribe((res: any) => {
      this.selecteddinitiativename = res[0]?.initiative_title;
    });
  }


  getkpidata(selecteddinitiative: any) {
    this.ds.paramFunction('common/getkpidata', selecteddinitiative)
      .subscribe((res: any) => {  // <- changed from any[]
        this.kpidata = res || [];
        this.kpiRowCount = this.kpidata.length;

        this.kpidata.forEach((kpi: any) => { // <- explicit any

          const alliedDeptString: string = kpi?.allieddepartment;
          if (alliedDeptString) {
            const alliedDeptArray: number[] = alliedDeptString
              .split(',')
              .map((v: string) => Number(v.trim()))
              .filter((v: number) => !isNaN(v));

            const requests = alliedDeptArray.map((id: number) =>
              this.ds.paramFunction('common/getallieddepartmentbyid', id)
            );

            if (requests.length > 0) {
              forkJoin<any[]>(requests).subscribe({
                next: (responses: any[]) => {
                  kpi.departmentData = responses.flat();
                },
                error: (err: any) => console.error(err)
              });
            } else {
              kpi.departmentData = [];
            }

          } else {
            kpi.departmentData = [];
          }

        });

      });
  }





  onSubmit() { }

}
