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

@Component({
  selector: 'app-addkpi',
  templateUrl: './addkpi.component.html',
  styleUrls: ['./addkpi.component.scss']
})
export class AddkpiComponent implements OnInit 
{
  public selecteddinitiativeid: any; public selecteddinitiativename: any;
  public initiativedetails: any = []; public selecteddinitiative: any;
  public departmentlist: any = []; public kpidataall: any = []; public kpi_id: any;
  public suggestivekpi: any = []; public departmentname: any; public isDisabled: boolean = false;
  isEditMode: boolean = false; isSaveMode: boolean = false; public selecteddept: any;
  public kpiForm!: FormGroup; public data: any = []; public sdgdata: any = [];
  public otherdept: any = false; public otherdeptid: any; public sdgdatabyid: any = [];
  public kpidataupdate: any = []; public sdgdatabyindicator: any = [];
  public kpiupdateid: any; public isCheckedS: any; public isCheckedN: any;

  public schemedata: any = [];

  public kpiTypes = ['Output', 'Outcome', 'Process'];
  public sdgarea: any = false; public newarea: any = true;
  public goalTerm = ['ShortTerm (2030)', 'MidTerm (2035)', 'LongTerm (2047)'];
  displayedColumns: string[] = ['sn', 'kpi_name', 'kpi_type', 'target_goal_term', 'target_value', 'target_accomplishment_date', 'unit_of_measurement', 'data_source', 'numerator', 'denominator','allieddepartment' , 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  @ViewChild(FormGroupDirective) formgroupDirective: FormGroupDirective ;

  constructor(private router: Router, private fb: FormBuilder, public ds: DataService, 
    private authService: AuthService, private route: ActivatedRoute, private dp: DatePipe
  ) { }

  ngOnInit(): void 
  {
    this.kpiForm = this.fb.group
    ({
      kpi_name: ['', Validators.required],
      kpi_type: [0, Validators.required],
      //weightage: ['', [Validators.required, Validators.min(0)]],
      target_goal_term: [0, [Validators.required]],
      target_value: [''],
      unit_of_measurement: ['', Validators.required],
      target_accomplishment_date: ['', Validators.required],
      data_source: [''],
      numerator: [''],
      denominator: [''],
      allieddepartment: [[0], Validators.required],
      otherallieddepartment:[],
      sdg_indicator: [0],
      kpi_cat: ['', Validators.required],
      scheme: [[0], Validators.required]
    });

    this.getdepartmentlist();

    this.selecteddinitiativeid = this.route.snapshot.paramMap.get('initaitiveid');
    this.getinitiativedetails(this.selecteddinitiativeid);
    this.getsuggestivekpi(this.selecteddinitiativeid); 
    let user = this.authService.currentUser;
    this.getdepartmentdata(user.dept_id);
    this.getsdgsuggestivekpi(user.dept_id);
    this.selecteddept = user.dept_id;
    this.getKPIdataall(this.selecteddept, this.selecteddinitiativeid);
    this.getschemedata(this.selecteddept);

    this.sdgarea = false;
    this.newarea = true;

    this.isCheckedS = false;
    this.isCheckedN = true;

    this.isEditMode = false;
    this.isSaveMode = true;
    this.otherdept = false;    

    this.kpiForm.patchValue
      ({
        kpi_cat: 'New'
      });
  }

  getdepartmentlist()
  {
    this.ds.getData('common/getdepartment').subscribe((res: any) => {
      this.departmentlist = res;
    });
  }

  getschemedata(deptid: any) 
  {
    this.ds.paramFunction('common/getscheme_data', deptid).subscribe((res: any) => {
      this.schemedata = res;
    });
  }

  getdepartmentdata(deptid: any) 
  {
    this.ds.paramFunction('common/getdepartmentdata', deptid).subscribe((res: any) => {
      this.departmentname = res[0]?.dept_name;
    });
  }

  getsuggestivekpi(selecteddinitiative: any)
  {
    this.ds.paramFunction('common/getinitiativewisekpi', selecteddinitiative).subscribe((res: any) => {
      this.suggestivekpi = res;
    });
  }

  getsdgsuggestivekpi(dept_id:any)
  {
    this.ds.paramFunction('common/getsdgdata', dept_id).subscribe((res: any) => {
      this.sdgdata = res;
    });
  }

  getinitiativedetails(selecteddinitiative : any)
  {
    this.ds.paramFunction('common/getinitiativedata', selecteddinitiative).subscribe((res: any) => {
      this.selecteddinitiativename = res[0]?.initiative_title;
    });
  }  

  showSDGDetails(id: any): void 
  {
    this.ds.param2Function('common/getsdgdatabyid', this.selecteddept, id).subscribe((res: any) => 
    {
      this.sdgdatabyid = res;
      Swal.fire({
        title: `📊 SDG Suggestive KPI Details`,
        width: '900px',
        showCloseButton: true,
        html: `
      <style>
        .sdg-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          color: #000;
          font-size: 12px;
          border: 1px solid #444;
        }

        .sdg-table th, .sdg-table td {
          border: 1px solid #555;
          padding: 5px;
          vertical-align: top;
          text-align: left;
        }

        .sdg-header {
          background-color: #0066cc;
          color: white;
          font-size: 14px;
          text-align: center;
          padding: 5px;
        }

        .label-cell {
          background-color: #f2f2f2;
          width: 28%;
          font-weight: 600;
        }

        .scroll-container {
          max-height: 450px;
          overflow-y: auto;
          margin-top: 5px;
        }
      </style>

      <div class="scroll-container">
        <table class="sdg-table">

          <thead>
            <tr>
              <th colspan="3" class="sdg-header">SDG KPI Information</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td class="label-cell">Goal</td>
              <td colspan="2">${this.sdgdatabyid[0]?.sdg_goal_master_id || '-'}</td>
            </tr>

            <tr>
              <td class="label-cell">Target</td>
              <td colspan="2">${this.sdgdatabyid[0]?.sif_target_desc || '-'}</td>
            </tr>

            <tr>
              <td class="label-cell">Indicator</td>
              <td colspan="2">${this.sdgdatabyid[0]?.indicator_desc || '-'}</td>
            </tr>

            <tr>
              <td class="label-cell">Computation Method</td>
              <td colspan="2">${this.sdgdatabyid[0]?.computation_description_of_indicator || '-'}</td>
            </tr>

            <tr>
              <td class="label-cell">Unit of Measure</td>
              <td colspan="2">${this.sdgdatabyid[0]?.uom || '-'}</td>
            </tr>

            <tr>
              <td class="label-cell">Data Source</td>
              <td colspan="2">${this.sdgdatabyid[0]?.progress_year_data_source || '-'}</td>
            </tr>

          </tbody>
        </table>
      </div>
    `,
        confirmButtonText: "Close",
        allowOutsideClick: true,
        allowEscapeKey: true
      });
    });
  }

  onSubmit() 
  {    
    let otherallieddepartmentv: any;

    if (this.otherdeptid == 100) 
    {
      otherallieddepartmentv = this.kpiForm.get('otherallieddepartment')?.value;
    } 
    else 
    {
      otherallieddepartmentv = '-';
    }

    const termValue = this.kpiForm.get('target_goal_term')?.value;
    const termMapping: any =
    {
      'ShortTerm (2030)': 'S',
      'MidTerm (2035)': 'M',
      'LongTerm (2047)': 'L'
    };      

    const schemeValue = this.kpiForm.get('scheme')?.value;
    const schemeString = schemeValue?.join(',');

    const allieddept = this.kpiForm.get('allieddepartment')?.value;
    const allieddeptstring = allieddept?.join(',');

    const dataToSend =
    {
      target_accomplishment_date: this.dp.transform(this.kpiForm.get("target_accomplishment_date")?.value, "yyyy-MM-dd"),
      kpi_name: this.kpiForm.get('kpi_name')?.value,
      kpi_type: this.kpiForm.get('kpi_type')?.value,
      target_goal_term: termMapping[termValue] || null, 
      target_value: this.kpiForm.get('target_value')?.value || null,
      unit_of_measurement: this.kpiForm.get('unit_of_measurement')?.value || null,
      data_source: this.kpiForm.get('data_source')?.value || null,
      numerator: this.kpiForm.get('numerator')?.value || null,
      denominator: this.kpiForm.get('denominator')?.value || null,
      allieddepartment: allieddeptstring,
      otherallieddepartment: otherallieddepartmentv,
      dept_id: this.selecteddept,
      initiative_id: this.selecteddinitiativeid,
      scheme: schemeString,
      kpi_cat: this.kpiForm.get('kpi_cat')?.value,
    }  

    this.ds.postData('crud/kpi_master_insert', dataToSend).subscribe(res => 
    {
      this.data = res;
      if (this.data) 
      {
        Swal.fire({
          icon: "success",
          text: 'Data Saved Succesfully',
          timer: 2000
        });
        this.getKPIdataall(this.selecteddept, this.selecteddinitiativeid);
      }
    });
    this.kpiForm.reset();
    setTimeout(() => this.formgroupDirective.resetForm(), 500);
    this.isEditMode = false;
    this.isSaveMode = false;
  }

  onAlliedDepartmentSelected(event: any) 
  {
    let values = event.value;

    if (values.length > 1 && values.includes(0)) 
    {
      values = values.filter((v: number) => v !== 0);
      this.kpiForm.get('allieddepartment')?.setValue(values);
    }

    this.otherdeptid = event.value;
    if (event.value == 100) {
      this.otherdept = true;
    }
    if (event.value != 100) {
      this.otherdept = false;
    }
  }


  EditKPI(id: any) 
  {
    this.kpi_id = id;
    this.ds.paramFunction('common/getkpimasterbykpiid', this.kpi_id).subscribe((res: any) => 
    {
      this.kpidataupdate = res;
      this.kpiupdateid = this.kpidataupdate?.[0]?.kpi_id;
      const termValue: string | undefined = this.kpidataupdate?.[0]?.target_goal_term;
      const termMapping: Record<string, string> = {
        'S': 'ShortTerm (2030)',
        'M': 'MidTerm (2035)',
        'L': 'LongTerm (2047)'
      };
      const mappedTerm = termMapping[termValue ?? ''] || null;  

      if (this.kpidataupdate[0]?.kpi_cat == 'New') 
      {
        this.sdgarea = false;
        this.newarea = true;

        this.isCheckedS = false;
        this.isCheckedN = true;
      }
      if (this.kpidataupdate[0]?.kpi_cat == 'SDG') 
      {
        this.sdgarea = true;
        this.newarea = false;

        this.isCheckedS = true;
        this.isCheckedN = false;
      }

      const schemeString = this.kpidataupdate[0]?.scheme;
      const schemeValue = schemeString?schemeString.split(',').map(Number) : [];

      const allieddeptstring = this.kpidataupdate[0]?.allieddepartment;
      const allieddept = allieddeptstring?allieddeptstring.split(',').map(Number) : [];
            
      this.kpiForm.patchValue
      ({
          target_goal_term: mappedTerm,
          target_accomplishment_date: this.dp.transform(
            this.kpidataupdate[0]?.target_accomplishment_date,
            "yyyy-MM-dd"
          ),
          kpi_name: this.kpidataupdate[0]?.kpi_name,
          kpi_type: this.kpidataupdate[0]?.kpi_type,
          target_value: this.kpidataupdate[0]?.target_value,
          unit_of_measurement: this.kpidataupdate[0]?.unit_of_measurement,
          data_source: this.kpidataupdate[0]?.data_source,
          numerator: this.kpidataupdate[0]?.numerator,
          denominator: this.kpidataupdate[0]?.denominator,
          allieddepartment: allieddept,
          otherallieddepartment: this.kpidataupdate[0]?.otherallieddepartment,
          kpi_cat: this.kpidataupdate[0]?.kpi_cat,
          scheme: schemeValue, 
          sdg_indicator: this.kpidataupdate[0]?.kpi_name,
      });
    });

    this.isEditMode = true;
    this.isSaveMode = false;
  }


  DeleteKPI(id: any) 
  {
    this.kpi_id = id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      }).then((result) => {
      if (result.isConfirmed) 
      {
        this.ds.updateData('crud/delete_master_kpi/' + this.kpi_id, this.kpiForm.value).subscribe(res => {
          this.data = res;
          if (this.data) {
            Swal.fire({
              icon: "info",
              text: 'KPI is Deleted now',
              timer: 2000
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
      window.location.reload();  
      this.formgroupDirective.resetForm();  
      this.isEditMode = false;
      this.isSaveMode = false;
    });
  }


  getKPIdataall(dept: any, initiativeid: any) 
  {
    let index = 0;
    this.ds.param2Function('common/getkpimasterdata', dept, initiativeid).subscribe((res: any) => 
    {
      this.kpidataall = res;
      if (res.length === 0 || res.length === undefined) 
      {
        this.kpidataall = [];
        this.dataSource = new MatTableDataSource(this.kpidataall);
        this.paginator.pageIndex = 0;
        this.paginator.length = 0;
      }
      if (res.length > 0) {
        this.kpidataall.forEach((e: any) => {
          this.kpidataall[index].sn = index + 1;
          index++;
        });
        this.dataSource = new MatTableDataSource(this.kpidataall);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }  


  onUpdate() 
  {
    const termValue = this.kpiForm.get('target_goal_term')?.value;

    const termMapping: any =
    {
      'ShortTerm (2030)': 'S',
      'MidTerm (2035)': 'M',
      'LongTerm (2047)': 'L'
    };      

    const schemeValue = this.kpiForm.get('scheme')?.value;
    const schemeString = schemeValue?.join(',');

    const allieddept = this.kpiForm.get('allieddepartment')?.value;
    const allieddeptstring = allieddept?.join(',');

    const dataToSend =
    {
      target_goal_term: termMapping[termValue] || null,  
      target_accomplishment_date: this.dp.transform(this.kpiForm.get("target_accomplishment_date")?.value, "yyyy-MM-dd"),
      kpi_name: this.kpiForm.get('kpi_name')?.value,
      kpi_type: this.kpiForm.get('kpi_type')?.value,
      target_value: this.kpiForm.get('target_value')?.value,
      unit_of_measurement: this.kpiForm.get('unit_of_measurement')?.value,
      data_source: this.kpiForm.get('data_source')?.value,
      numerator: this.kpiForm.get('numerator')?.value,
      denominator: this.kpiForm.get('denominator')?.value,
      allieddepartment: allieddeptstring,
      otherallieddepartment: this.kpiForm.get('otherallieddepartment')?.value,
      kpi_cat: this.kpiForm.get('kpi_cat')?.value,
      scheme: schemeString,
    };

    this.ds.updateData('crud/update_master_kpi/' + this.kpiupdateid, dataToSend).subscribe(res => 
    {
      this.data = res;
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'Data Updated Successfully',
          timer: 2000
        });

        this.kpiForm.reset();
        setTimeout(() => this.formgroupDirective.resetForm(), 500);
        window.location.reload();
      }
    });
  }


  onReset()
  {
    window.location.reload();
  }


  onChangeKPICat(event: any) 
  {
    if (event.value == 'New') 
    {
      this.sdgarea = false;
      this.newarea = true;

      this.isCheckedS = false;
      this.isCheckedN = true;

      this.kpiForm.patchValue
        ({
          kpi_cat: 'New'
        });
    }
    if (event.value == 'SDG') 
    {
      this.sdgarea = true;
      this.newarea = false;

      this.isCheckedS = true;
      this.isCheckedN = false;

      this.kpiForm.patchValue
        ({
          kpi_cat: 'SDG'
        });
    }    
  }


  onkpi_typeSelected(event: any) 
  { 

  }

  onSchemeSelected(event: any)
  {
    let values = event.value;
    if (values.length > 1 && values.includes(0)) 
    {
      values = values.filter((v: number) => v !== 0);
      this.kpiForm.get('scheme')?.setValue(values);
    }
  }


  onSDGIndicator(event: any) 
  { 
    const selectedId = event.value;

    const selectedText = this.sdgdata.find(
      (x: any) => x.indicator_id === selectedId
    )?.indicator_desc;

    this.ds.paramFunction('common/getsdgdatabyindicator', selectedId).subscribe((res: any) => 
    {
      this.sdgdatabyindicator = res;
      this.kpiForm.patchValue
      ({
        kpi_name: this.sdgdatabyindicator[0]?.indicator_desc,
        target_value: this.sdgdatabyindicator[0]?.kpi_target2030,
        unit_of_measurement: this.sdgdatabyindicator[0]?.uom,
        data_source: this.sdgdatabyindicator[0]?.indicator_source,
        numerator: this.sdgdatabyindicator[0]?.numerator,
        denominator: this.sdgdatabyindicator[0]?.denominator
      });
    });    
  }





}
