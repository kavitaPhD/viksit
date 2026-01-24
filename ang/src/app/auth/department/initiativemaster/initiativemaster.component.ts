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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-initiativemaster',
  templateUrl: './initiativemaster.component.html',
  styleUrls: ['./initiativemaster.component.scss']
})
export class InitiativemasterComponent implements OnInit 
{
  public initiativesmasterForm: FormGroup; 

  public initiativedata: any = []; public allieddept: any = []; 
  public isDisabled: boolean = false; public schemedata: any = []; public data: any = []; 

  public departmentname: any;

  displayedColumns: string[] = ['sn', 'initiative_title', 'term_description', 'action', 'kpiaddition', 'kpiprogressenter' ,'kpiprogress'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  statusOptions: string[] = ['Not Started', 'In Progress', 'Completed'];

  termOptions: string[] = ['Short Term', 'Mid Term', 'Long Term'];

  @ViewChild(FormGroupDirective) formgroupDirective: FormGroupDirective;

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService)
  { }

  ngOnInit(): void 
  {
    this.initiativesmasterForm = this.fb.group({
      initiative_id: [0, Validators.required],
      initiative_name:[''],
      allied_department_id: [0, Validators.required],
      allied_scheme_id: [0, Validators.required],
      potential_risk: ['', Validators.required],
      risk_mitigation: ['', Validators.required],
      total_funding_risk: [0, [Validators.required, Validators.min(0)]],
      funding_request_this_year: [0, [Validators.required, Validators.min(0)]],
      funding_source: ['', Validators.required],
      status: [this.statusOptions[0], Validators.required] ,
      target_year_duration: [this.termOptions[0], Validators.required]     
    });

    let user = this.authService.currentUser;
    this.getinitiative(user.dept_id);
    this.getallieddept(user.dept_id);
    this.getdepartmentdata(user.dept_id);
    this.getscheme();
  }

  getdepartmentdata(deptid: any) {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  getinitiative(dept_id : any)
  {
    let index = 0;
    this.ds.paramFunction('common/getdeptwise_initiative', dept_id).subscribe((res: any) => {
      this.initiativedata = res;
      this.initiativedata.forEach((e: any) => {
        this.initiativedata[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.initiativedata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getallieddept(dept_id: any) 
  {
    this.ds.getData('common/getdeptforinitiative')
      .subscribe((res: any) => 
      {
        this.allieddept = res;  
        console.log("heloo", this.allieddept);
      });
  }

  getscheme()
  {
    this.ds.getData('common/getscheme_name')
      .subscribe((res: any) => 
      {
        this.schemedata = res;
      }); 
  }

  onSubmit(): void 
  {
    // this.isDisabled = true;
    // if (this.initiativesmasterForm.valid) 
    // {
    //   console.log('Form Submitted!', this.initiativesmasterForm.value);
    // } 
    // else 
    // {
    //   this.initiativesmasterForm.markAllAsTouched();
    // }

    this.initiativesmasterForm.patchValue
      ({
        initiative_id: this.initiativesmasterForm.get('initiative_id')?.value,
        initiative_name: this.initiativesmasterForm.get('initiative_name')?.value,
        allied_department_id: this.initiativesmasterForm.get('allied_department_id')?.value,
        allied_scheme_id: this.initiativesmasterForm.get('allied_scheme_id')?.value,
        potential_risk: this.initiativesmasterForm.get('potential_risk')?.value,
        risk_mitigation: this.initiativesmasterForm.get('risk_mitigation')?.value,
        total_funding_risk: this.initiativesmasterForm.get('total_funding_risk')?.value,
        funding_request_this_year: this.initiativesmasterForm.get('funding_request_this_year')?.value,
        funding_source: this.initiativesmasterForm.get('funding_source')?.value,
        status: this.initiativesmasterForm.get('status')?.value,
        target_year_duration: this.initiativesmasterForm.get('target_year_duration')?.value
      });

    
    this.ds.postData('crud/initiativedetails_insert', this.initiativesmasterForm.value).subscribe(res => 
    {
      this.data = res;
      if (this.data) 
      {
        Swal.fire({
          icon: "success",
          text: 'Data Saved Succesfully',
          timer: 2000
        });

        let index = 0;
        // this.ds.getData('common/getscheme_name').subscribe((res: any) => 
        // {
        //   this.schemedata = res;
        //   this.schemedata.forEach((e: any) => {
        //     this.schemedata[index].sn = index + 1;
        //     index++;
        //   });
        //   // this.dataSource = new MatTableDataSource(this.schemedata);
        //   // this.dataSource.paginator = this.paginator;
        //   // this.dataSource.sort = this.sort;
        // });

      }
    });
    this.initiativesmasterForm.reset();
    setTimeout(() => this.formgroupDirective.resetForm(), 500);
    // this.isEditMode = false;
    // this.isSaveMode = false;
  }

  get f() {
    return this.initiativesmasterForm.controls;
  }

  onInitiativeSelected(event: any) 
  {
    const selectedText = event.source.triggerValue;   // The display text
    this.initiativesmasterForm.patchValue({
      initiative_name: selectedText
    });
  }

  onAlliedDepartmentSelected(event: any)
  {

  }

  onAlliedSchemeSelected(event: any) 
  {

  }
}
