import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
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
  selector: 'app-themedetails',
  templateUrl: './themedetails.component.html',
  styleUrls: ['./themedetails.component.scss']
})
export class ThemedetailsComponent implements OnInit 
{
  public themedata: any = [];
  public selectedthemeid: any;


  constructor(private router: Router, private fb: FormBuilder, public ds: DataService,
    private authService: AuthService, private route: ActivatedRoute, private dp: DatePipe
  ) 
  {


  }


  ngOnInit(): void 
  {
    this.selectedthemeid = this.route.snapshot.paramMap.get('themeid');
    this.getthemedata(this.selectedthemeid);
  }

  getthemedata(themeid: any) 
  {
    this.ds.paramFunction('common/getthemeinitiative', themeid).subscribe((res: any) => {
      this.themedata = res;
    });

  }

}
