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
  selector: 'app-themewiseprogress',
  templateUrl: './themewiseprogress.component.html',
  styleUrls: ['./themewiseprogress.component.scss']
})
export class ThemewiseprogressComponent implements OnInit 
{

  public receivedTheme: string = '';

  themeTable = [
    { sn: 1, theme: "Powerhouse of Agricultural Produce & Processed Superfoods", shortTerm: 16, midTerm: 9, longTerm: 5, total: 30 },
    { sn: 2, theme: "Hub for MFP & Herbals", shortTerm: 15, midTerm: 7, longTerm: 1, total: 23 },
    { sn: 3, theme: "Titan in Industry", shortTerm: 8, midTerm: 11, longTerm: 5, total: 27 },
    { sn: 4, theme: "Tourism - Celebrating Natural & Cultural Tapestry", shortTerm: 13, midTerm: 3, longTerm: 1, total: 17 },
    { sn: 5, theme: "Leader in Inland Logistics", shortTerm: 8, midTerm: 6, longTerm: 5, total: 19 },
    { sn: 6, theme: "Expansion into AI & IT Services", shortTerm: 11, midTerm: 4, longTerm: 1, total: 15 },
    { sn: 7, theme: "Land of Innovation, Skilled Human Capital & Quality Education", shortTerm: 13, midTerm: 6, longTerm: 1, total: 20 },
    { sn: 8, theme: "A Healthy & Prospering Society", shortTerm: 18, midTerm: 8, longTerm: 4, total: 30 },
    { sn: 9, theme: "Leader in Sustainable & Renewables Led Development", shortTerm: 18, midTerm: 3, longTerm: 2, total: 21 },
    { sn: 10, theme: "Art & Culture Capital of India", shortTerm: 6, midTerm: 6, longTerm: 3, total: 15 },
    { sn: 11, theme: "Infrastructure for Thriving Communities", shortTerm: 8, midTerm: 5, longTerm: 3, total: 16 },
    { sn: 12, theme: "Governance for Lasting Value Creation", shortTerm: 11, midTerm: 4, longTerm: 2, total: 17 },
    { sn: 13, theme: "Premier Investment Destination", shortTerm: 2, midTerm: 3, longTerm: 2, total: 7 }
  ];

  // Example completed values for short-term count
  completed2030: number[] = 
  [
    12, 10, 6, 5, 7, 6, 9, 14, 12, 3, 7, 6, 1
  ];

  constructor(private router: Router, private fb: FormBuilder, public ds: DataService, 
    private authService: AuthService, private route: ActivatedRoute  )  { }

  ngOnInit(): void 
  { 
    this.route.queryParams.subscribe(params => 
    {
      this.receivedTheme = params['theme'];
      console.log("Received Theme:", this.receivedTheme);
    });
  }

  getMiniChartOptions(completed: number, total: number) 
  {
    return {
      chart: {
        type: "bar",
        height: 45,
        sparkline: { enabled: true }
      },
      plotOptions: 
      {
        bar: { columnWidth: "60%" }
      },
      series: [{ data: [completed] }],
      colors: ["#28a745"],   // green bar
      tooltip: { enabled: true },
      xaxis: { categories: ["Completed"] }
    };
  }


  goBack()
  {
    this.router.navigate(
      ['/cmo/cmothemeinitiative'] 
    );
  }

}
