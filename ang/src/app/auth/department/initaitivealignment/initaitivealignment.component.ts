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

@Component({
  selector: 'app-initaitivealignment',
  templateUrl: './initaitivealignment.component.html',
  styleUrls: ['./initaitivealignment.component.scss']
})
export class InitaitivealignmentComponent implements OnInit 
{

  public initiativesalignForm: FormGroup;

  public departmentname : any; 

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) 
  {
    this.initiativesalignForm = this.fb.group({
      initiatives: this.fb.array([])
    });
  }


  ngOnInit(): void 
  {
    let user = this.authService.currentUser;

    this.ds.paramFunction('data/getdeptwise_modifyinitiative', user.dept_id).subscribe((res: any) => 
    {
        //console.log("API RESPONSE => ", res);  
        const formArray = this.initiativesalignForm.get('initiatives') as FormArray;
        formArray.clear();  
        res.forEach((item: any, index: number) => 
        {
          formArray.push(
            this.fb.group({
              sn: [index + 1],
              initiativeTitle: [item.initiativeTitle],
              department: [item.department],
              agency: ['-'],
              type: ['-'],
              targetYear: [item.type] // will be set by radio buttons
            })
          );
        });
      });
    this.getdepartmentdata(user.dept_id);
  }


  getdepartmentdata(deptid: any) 
  {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  get initiativesArray(): FormArray 
  {
    return this.initiativesalignForm.get('initiatives') as FormArray;
  } 

  onSubmit(): void 
  {
    // if (this.initiativesForm.valid) 
    // {
    //   console.log('Form is valid. Updated initiatives data:');      
    //   const updatedData = this.initiativesForm.value.initiatives;
    //   console.log(updatedData);
    // } 
    // else 
    // {
    //   console.log('Form is invalid. Cannot submit.');
    //   this.initiativesForm.markAllAsTouched();
    // }
  }
}