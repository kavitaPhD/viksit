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
  selector: 'app-policyentry',
  templateUrl: './policyentry.component.html',
  styleUrls: ['./policyentry.component.scss']
})
export class PolicyentryComponent implements OnInit {

  public trackerForm!: FormGroup;

  departments: string[] = [
    'Agriculture Department',
    'Allied Services',
    'Finance Department',
    'Planning Commission',
    'Water Resources',
    // Add more departments as needed
  ];

  constructor(private router: Router, private fb: FormBuilder,
    public ds: DataService, private authService: AuthService) { }
  ngOnInit(): void {
    this.trackerForm = this.fb.group({
      initiativeTitle: ['Agriculture & allied Vision (30 Initiatives)'],
      policyNumber: [''],
      overallStatus: [''],
      lastUpdate: [''],
      mainResponsibleDept: ['Agriculture Department'],
      // CHANGE: Initial value for multi-select should be an array
      assistingDept: [['Allied Services', 'Rural Development']]
    });

    // ... (Disabling other controls)

    this.trackerForm.get('initiativeTitle')?.disable();
    this.trackerForm.get('policyNumber')?.disable();
    this.trackerForm.get('overallStatus')?.disable();
    this.trackerForm.get('lastUpdate')?.disable();
  }

  onSubmit(): void {
    // When submitting, 'assistingDept' will be an array of selected department names
    console.log('Main Department:', this.trackerForm.value.mainResponsibleDept);
    console.log('Assisting Departments:', this.trackerForm.value.assistingDept);
  }
}