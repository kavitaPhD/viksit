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
  selector: 'app-newinitaitive',
  templateUrl: './newinitaitive.component.html',
  styleUrls: ['./newinitaitive.component.scss']
})
export class NewinitaitiveComponent implements OnInit 
{
  public initiativeentryForm: FormGroup;

  public isDisabled: boolean = false;
  public initiativedata: any = []; public data: any = []; 
  public initiativeid: any; public initiativedataupdate: any = []; public departmentname: any;

  public initiativedataupdateid : any; public selecteddept :  any;

  @ViewChild(FormGroupDirective) formgroupDirective: FormGroupDirective;

  displayedColumns: string[] = ['sn', 'initiative_title', 'term_description','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  isEditMode: boolean = false; isSaveMode: boolean = false;
  termOptions: string[] = ['Short Term', 'Mid Term', 'Long Term'];

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) 
  {  }

  ngOnInit(): void 
  {
    this.initiativeentryForm = this.fb.group({
      term: [this.termOptions[0], Validators.required],
      initiative_title: ['', Validators.required],
      dept_id: [''],
      owner: [''],
    });

    let user = this.authService.currentUser;
    this.getinitiative(user.dept_id);
    this.getdepartmentdata(user.dept_id);

    this.selecteddept=user.dept_id;

    this.isEditMode = false;
    this.isSaveMode = true;
  }

  getdepartmentdata(deptid: any) 
  {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  getinitiative(dept_id : any) 
  {
    let index = 0;
    this.ds.paramFunction('common/getdeptwise_initiative', dept_id).subscribe((res: any) => 
    {
      this.initiativedata = res;
      this.initiativedata.forEach((e: any) => 
      {
        this.initiativedata[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.initiativedata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  onSubmit() 
  {
    const termValue = this.initiativeentryForm.get('term')?.value;
    
    const termMapping: any = {
      'Short Term': 'S',
      'Mid Term': 'M',
      'Long Term': 'L'
    };

    const dataToSend = 
    {
      term: termMapping[termValue] || null,  
      initiative_title: this.initiativeentryForm.get('initiative_title')?.value,
      dept_id: this.selecteddept,
      owner: 'P'
    };

    this.ds.postData('crud/master_initiative_insert', dataToSend).subscribe(res => 
    {
      this.data = res;
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'Data Saved Succesfully',
          timer: 2000
        });

        let index = 0;
        this.ds.paramFunction('common/getdeptwise_initiative', this.selecteddept).subscribe((res: any) => {
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
    });
    this.initiativeentryForm.reset();
    setTimeout(() => this.formgroupDirective.resetForm(), 500);
    this.isEditMode = false;
    this.isSaveMode = false;
  }

  

  EditInitiative(id: any)
  {
    this.initiativeid = id;

    this.ds.paramFunction('common/getinitiativedata', this.initiativeid).subscribe((res: any) => 
    {
      this.initiativedataupdate = res;

      this.initiativedataupdateid = this.initiativedataupdate?.[0]?.initiative_id;

      const termValue: string | undefined = this.initiativedataupdate?.[0]?.term;
      const termMapping: Record<string, string> = {
        'S': 'Short Term',
        'M': 'Mid Term',
        'L': 'Long Term'
      };
      const mappedTerm = termMapping[termValue ?? ''] || null; 

      this.initiativeentryForm.patchValue
      ({
        term: mappedTerm,
        initiative_title: this.initiativedataupdate[0]?.initiative_title,
        dept_id: this.initiativedataupdate[0]?.dept_id,
        owner: 'P'
      });
     });

    this.isEditMode = true;
    this.isSaveMode = false;
  }



  DeleteInitiative(id: any)
  {
    this.initiativeid = id;
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => 
    {
      if (result.isConfirmed) 
      {
          this.ds.updateData('crud/delete_master_initiative/' + this.initiativeid, this.initiativeentryForm.value).subscribe(res => 
        {
            this.data = res;
            if (this.data) 
            {
              Swal.fire({
                icon: "info",
                text: 'Initiative is Deleted now',
                timer: 2000
              });
              let index = 0;
              this.ds.paramFunction('common/getdeptwise_initiative', this.selecteddept).subscribe((res: any) => {
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
            else {
              Swal.fire({
                icon: "error",
                text: 'Error, Please check....',
                timer: 2000
              });
            }
          });
      }
    });
  }

  
  
  onUpdate() 
  {
    const termValue = this.initiativeentryForm.get('term')?.value;
    const termMapping: any = 
    {
      'Short Term': 'S',
      'Mid Term': 'M',
      'Long Term': 'L'
    };

    const dataToSend =
    {
      term: termMapping[termValue] || null,
      initiative_title: this.initiativeentryForm.get('initiative_title')?.value,
      dept_id: this.selecteddept,
      owner: 'P'
    };

    this.ds.updateData('crud/update_master_initiative/' + this.initiativedataupdateid, dataToSend).subscribe(res => 
    {
      this.data = res;
      if (this.data) 
      {
        Swal.fire({
          icon: "success",
          text: 'Data Updated Successfully',
          timer: 2000
        });

        this.initiativeentryForm.reset();
        setTimeout(() => this.formgroupDirective.resetForm(), 500);
        window.location.reload();
      }
    });
  }


  scrollToTop() {  }


  onReset()
  {
    window.location.reload();
  }


}
