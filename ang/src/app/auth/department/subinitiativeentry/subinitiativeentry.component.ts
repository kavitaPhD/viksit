import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../../services/data.service'; // Assuming these services exist
import { AuthService } from '../../../services/auth.service'; // Assuming these services exist
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries, ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis,
  ChartComponent
} from "ng-apexcharts"; // Assuming you use ApexCharts
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive, ApexMarkers, ApexAnnotations,
  ApexGrid
} from "ng-apexcharts"; // Assuming you use ApexCharts
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";

export interface Initiative {
  sn: number;
  initiativeTitle: string;
  department: string;
  agency: string;
  type: string;
  targetYear: string;
}

@Component({
  selector: 'app-subinitiativeentry',
  templateUrl: './subinitiativeentry.component.html',
  styleUrls: ['./subinitiativeentry.component.scss']
})


export class SubinitiativeentryComponent implements OnInit 
{
  initiativesForm!: FormGroup;

  initialInitiatives: Initiative[] = [
    { sn: 1, initiativeTitle: 'Develop commodity-specific clusters (pilots for 15 mission)', department: 'Agriculture & allied', agency: 'District KVSs', type: 'Institution', targetYear: '2030' },
    { sn: 2, initiativeTitle: 'Institutionalize a two-pronged State Paddy Mission', department: 'Agriculture & allied', agency: 'State SteerCo', type: 'Institution', targetYear: '2030' },
    { sn: 3, initiativeTitle: 'Launch Agri & Allied Export Promotion Policy', department: 'Agriculture & allied', agency: 'APEDA', type: 'Policy / Program', targetYear: '2030' },
    { sn: 4, initiativeTitle: 'Set-up Agri Export Zones in convergence with APEDA', department: 'Agriculture & allied', agency: 'APEDA', type: 'Physical infra', targetYear: '2035' },
    { sn: 5, initiativeTitle: 'Strong regional brand for Chhattisgarh\'s produce', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2035' },
    { sn: 6, initiativeTitle: 'Set-up Village Export Hubs in convergence with APEDA', department: 'Agriculture & allied', agency: 'APEDA', type: 'Physical infra', targetYear: '2047' },
    { sn: 7, initiativeTitle: 'Foster dedicated market linkages – domestic and global', department: 'Agriculture & allied', agency: 'C&I', type: 'Policy / Program', targetYear: '2047' },
    { sn: 8, initiativeTitle: 'Scale irrigation-as-a-service – scheme for PAYG via Pvt.', department: 'Agriculture & allied', agency: 'Water', type: 'Policy / Program', targetYear: '2030' },
    { sn: 9, initiativeTitle: 'Launch an irrigation revolving fund with NABARD', department: 'Agriculture & allied', agency: 'NABARD', type: 'Policy / Program', targetYear: '2030' },
    { sn: 10, initiativeTitle: 'Develop advanced irrigation infrastructure', department: 'Agriculture & allied', agency: 'Water', type: 'Physical infra', targetYear: '2030' },
    { sn: 11, initiativeTitle: 'Launch FPO Mentorship Program with NABARD', department: 'Agriculture & allied', agency: 'NABARD', type: 'Policy / Program', targetYear: '2030' },
    { sn: 12, initiativeTitle: 'Implement seamless phygital commerce for FPOs', department: 'Agriculture & allied', agency: 'CHiPS', type: 'Digital', targetYear: '2035' },
    { sn: 13, initiativeTitle: 'Incentivize FPOs registered on national portals', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2030' },
    { sn: 14, initiativeTitle: 'Set-up a biotech CoE in Raipur in PPP', department: 'Agriculture & allied', agency: '-', type: 'Physical infra', targetYear: '2030' },
    { sn: 15, initiativeTitle: 'Develop CG as hub for quality seeds and planting material', department: 'Agriculture & allied', agency: '-', type: 'Institution', targetYear: '2035' },
    { sn: 16, initiativeTitle: 'Orchestrate an R&D Ecosystem – incentivize academia', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2035' },
    { sn: 17, initiativeTitle: 'Implement a central land records', department: 'Agriculture & allied', agency: 'CHiPS', type: 'Digital', targetYear: '2047' },
    { sn: 18, initiativeTitle: 'State wide mission for 30% organic by 2047', department: 'Agriculture & allied', agency: 'Tourism', type: 'Policy / Program', targetYear: '2030' },
    { sn: 19, initiativeTitle: 'Facilitate climate smart practices like INM', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2030' },
    { sn: 20, initiativeTitle: 'Annadaata to Urjadaata: Biofuel Programme', department: 'Agriculture & allied', agency: 'CBDA', type: 'Policy / Program', targetYear: '2030' },
    { sn: 21, initiativeTitle: 'Launch an Agri Promotion Fund – FOF model', department: 'Agriculture & allied', agency: 'Finance', type: 'Policy / Program', targetYear: '2030' },
    { sn: 22, initiativeTitle: 'Increase access to KCCs by forming JLGs', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2030' },
    { sn: 23, initiativeTitle: 'Ensure price support via organized mandis', department: 'Agriculture & allied', agency: '-', type: 'Physical infra', targetYear: '2035' },
    { sn: 24, initiativeTitle: 'Mission for private anchors & foreign investment', department: 'Agriculture & allied', agency: 'C&I', type: 'Policy / Program', targetYear: '2047' },
    { sn: 25, initiativeTitle: 'Utilize KVKs, RIPA and RSICs as district coordinators', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2030' },
    { sn: 26, initiativeTitle: 'Set-up ADARSH colleges focused on agriculture', department: 'Agriculture & allied', agency: 'Education', type: 'Physical infra', targetYear: '2035' },
    { sn: 27, initiativeTitle: 'Partner with start-ups to implement agri-tech solutions', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2035' },
    { sn: 28, initiativeTitle: 'Integrated sensor technologies like drones', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2030' },
    { sn: 29, initiativeTitle: 'Targeted program for agriculturally backward areas', department: 'Agriculture & allied', agency: '-', type: 'Policy / Program', targetYear: '2035' },
    { sn: 30, initiativeTitle: 'Pilot agro-tourism', department: 'Agriculture & allied', agency: 'Tourism', type: 'Physical infra', targetYear: '2047' },
  ];

  constructor(private router: Router, private fb: FormBuilder,
    public ds: DataService, private authService: AuthService) {

    this.initiativesForm = this.fb.group({
      initiatives: this.fb.array([]),
    });

    this.loadInitiatives();

  }

  ngOnInit(): void {
    this.initiativesForm = this.fb.group({
      initiatives: this.fb.array([]),
    });

    this.loadInitiatives();
  }

  loadInitiatives() {
    this.initialInitiatives.forEach(init => {
      this.initiativesArray.push(this.createInitiativeGroup(init));
    });
  }

  createInitiativeGroup(init: Initiative): FormGroup {
    return this.fb.group({
      sn: [init.sn],
      initiativeTitle: [init.initiativeTitle],
      department: [init.department],
      agency: [init.agency],
      type: [init.type],
      targetYear: [init.targetYear],
      subInitiatives: this.fb.array([]) // sub-rows
    });
  }

  /**
   * Creates a new FormGroup for a single Metric, containing its name and unit.
   */
  createMetricGroup(): FormGroup {
    return this.fb.group({
      metricName: ['', Validators.required],
      unit: [''],
    });
  }

  /**
   * Creates a new FormGroup for a sub-initiative, containing core fields and the nested metrics FormArray.
   */
  createSubInitiativeRow(): FormGroup {
    return this.fb.group({
      subInitiativeName: ['', Validators.required],
      schemeName: [''],
      allieddepartment: [''], // Re-adding allied department for consistency with HTML
      metrics: this.fb.array([this.createMetricGroup()]), // Start with one metric group
      potentialRisk: [''],
      riskMitigation: [''],
      totalFundingRequest: [''],
      fundingRequestCurrentYear: [''],
      fundingSource: [''],
      targetDateOfCompletion: [''],
      completionStatus: ['']
    });
  }

  get initiativesArray(): FormArray {
    return this.initiativesForm.get('initiatives') as FormArray;
  }

  getSubInitiatives(index: number): FormArray {
    return this.initiativesArray.at(index).get('subInitiatives') as FormArray;
  }

  /**
   * Gets the nested 'metrics' FormArray for a specific sub-initiative.
   * @param i Index of the main initiative.
   * @param j Index of the sub-initiative.
   */
  getMetricsArray(i: number, j: number): FormArray {
    return this.getSubInitiatives(i).at(j).get('metrics') as FormArray;
  }

  addSubInitiative(i: number) {
    this.getSubInitiatives(i).push(this.createSubInitiativeRow());
  }

  removeSubInitiative(i: number, j: number) {
    this.getSubInitiatives(i).removeAt(j);
  }

  /**
   * Adds a new metric group to a specific sub-initiative's metrics array.
   * @param i Index of the main initiative.
   * @param j Index of the sub-initiative.
   */
  addMetric(i: number, j: number) {
    this.getMetricsArray(i, j).push(this.createMetricGroup());
  }

  /**
   * Removes a metric group from a specific sub-initiative's metrics array.
   * @param i Index of the main initiative.
   * @param j Index of the sub-initiative.
   * @param k Index of the metric group to remove.
   */
  removeMetric(i: number, j: number, k: number) {
    this.getMetricsArray(i, j).removeAt(k);
  }

  submit() {
    console.log(this.initiativesForm.value);
  }
}