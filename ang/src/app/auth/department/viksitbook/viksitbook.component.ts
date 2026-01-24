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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-viksitbook',
  templateUrl: './viksitbook.component.html',
  styleUrls: ['./viksitbook.component.scss']
})
export class ViksitbookComponent implements OnInit {

  pdfUrl: SafeResourceUrl | undefined;
  private pdfPath: string = '';
  public currentUser: any; username: any; public deptname: any;

  constructor(private router: Router, private fb: FormBuilder,
    public ds: DataService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void 
  {
    
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.username = user.username;
    if (user.dept_id == 1)
    {
      this.pdfPath = 'assets/report/Agriculture.pdf';
    }
    else if (user.dept_id == 2) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    }
    else if (user.dept_id == 3) 
    {
      this.pdfPath = 'assets/report/Industry.pdf';
    } 
    else if (user.dept_id == 4) 
    {
      this.pdfPath = 'assets/report/GoodGovernance.pdf';
    } 
    else if (user.dept_id == 5) 
    {
      this.pdfPath = 'assets/report/GoodGovernance.pdf';
    } 
    else if (user.dept_id == 6) 
    {
      this.pdfPath = 'assets/report/IT.pdf';
    } 
    else if (user.dept_id == 7) 
    {
      this.pdfPath = 'assets/report/Industry.pdf';
    } 
    else if (user.dept_id == 8) 
    {
      this.pdfPath = 'assets/report/.pdf';
    } 
    else if (user.dept_id == 9) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 10) 
    {
      this.pdfPath = 'assets/report/Health.pdf';
    } 
    else if (user.dept_id == 11) 
    {
      this.pdfPath = 'assets/report/Health.pdf';
    } 
    else if (user.dept_id == 12) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 13) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 14) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 15) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 16) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 17) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 18) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 19) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 20) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 21) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 22) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    } 
    else if (user.dept_id == 23) 
    {
      this.pdfPath = 'assets/report/Arts.pdf';
    }
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfPath);
   
  }
}
