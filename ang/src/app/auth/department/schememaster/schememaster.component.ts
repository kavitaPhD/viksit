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
  selector: 'app-schememaster',
  templateUrl: './schememaster.component.html',
  styleUrls: ['./schememaster.component.scss']
})

export class SchememasterComponent implements OnInit 
{
  public schemesmasterForm: FormGroup; 
  public isDisabled: boolean = false;
  public schemedata: any = []; public data: any = []; 

  public totalRows: number = 0;
  public pageSize = 100;
  public currentPage = 0;
  public pageSizeOptions: number[] = [100, 200, 500, 1000];
  @ViewChild(FormGroupDirective) formgroupDirective: FormGroupDirective;


  displayedColumns: string[] = ['sn','schemename','scheme_type'];
  dataSource: MatTableDataSource<any> ;
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild('sort') sort!: MatSort;
  isEditMode: boolean = false; isSaveMode: boolean = false;

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) {
  }

  ngOnInit(): void 
  {
    this.schemesmasterForm = this.fb.group({
      scheme_type: ['', Validators.required],
      schemename: ['', Validators.required],
    });
    this.getscheme();
    this.isEditMode = false;
    this.isSaveMode = true;
  }

  getscheme() 
  {
    let index = 0;
    this.ds.getData('common/getscheme_name').subscribe((res: any) => 
    {
        this.schemedata = res;
        this.schemedata.forEach((e:any) => {
          this.schemedata[index].sn = index + 1;
          index++;
        });
        this.dataSource = new MatTableDataSource(this.schemedata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }


  onSubmit()
  {
    const dataToSend =
    {
      scheme_type: this.schemesmasterForm.get('scheme_type')?.value,
      schemename: this.schemesmasterForm.get('schemename')?.value,
     
    };

    this.ds.postData('crud/schemeinsert', dataToSend).subscribe(res => 
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
        this.ds.getData('common/getscheme_name').subscribe((res: any) => {
          this.schemedata = res;
          this.schemedata.forEach((e: any) => {
            this.schemedata[index].sn = index + 1;
            index++;
          });
          this.dataSource = new MatTableDataSource(this.schemedata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

      }
    });
    this.schemesmasterForm.reset();
    setTimeout(() => this.formgroupDirective.resetForm(), 500);
    this.isEditMode = false;
    this.isSaveMode = false;
  }

  onReset()
  {
    this.schemesmasterForm.reset();
  }


}
