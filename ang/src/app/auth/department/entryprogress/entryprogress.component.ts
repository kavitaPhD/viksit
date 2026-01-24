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



export interface InitiativeTrackingRow {
  sn: number;
  title: string; // Title of the supportive task/initiative
  responsibleDept: string;
  secondResponsible?: string;
  currentStatus: string; // e.g., 'On Track', 'Delayed'
  dependencyIndicator: 'Completed' | 'Pending';
}

export interface RiskMitigationRow {
  sn: number;
  riskDetail: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  mitigationPlan: string;
}

export interface MegaGoalStatus {
  statusLabel: 'Current Status' | 'Target Achieved';
  target2030: boolean;
  target2035: boolean;
  target2047: boolean;
}

export interface TrackerFormValue {
  // Header/Metadata
  initiativeTitle: string;
  policyNumber: string;
  overallStatus: string;
  lastUpdate: string;
  mainResponsibleDept: string;
  assistingDept: string;
  mainResponsibleOfficial: string;
  assistingOfficial: string;

  // Mega Goal Section
  megaGoalCurrent: MegaGoalStatus;
  megaGoalAchieved: MegaGoalStatus;

  // Tables
  initiativeTracking: InitiativeTrackingRow[];
  riskMitigation: RiskMitigationRow[];
}

@Component({
  selector: 'app-entryprogress',
  templateUrl: './entryprogress.component.html',
  styleUrls: ['./entryprogress.component.scss']
})


export class EntryprogressComponent implements OnInit 
{
  trackerForm!: FormGroup;
  departments = ['Agriculture & allied', 'Health Department', 'Commerce & Industry (C&I)', 'CSIDC', 'CHiPS', 'SIPB', 'District KVSs', 'State SteerCo', 'APEDA', 'Water', 'NABARD', 'Tourism', 'CBDA', 'Finance', 'Education'];
  riskLevels = ['High', 'Medium', 'Low'];
  currentStatuses = ['On Track', 'Delayed', 'To Be Stopped', 'To Be Started', 'To Be Completed'];
  dependencyIndicators = ['Completed', 'Pending'];

  constructor(private router: Router, private fb: FormBuilder,
    public ds: DataService, private authService: AuthService) {  }

  ngOnInit(): void 
  {
    this.trackerForm = this.fb.group({

      // --- Header/Metadata Section ---
      initiativeTitle: ['Construction of Agriculture Services PPP Policy', Validators.required],
      policyNumber: ['XX', Validators.required],
      overallStatus: ['Active', Validators.required],
      lastUpdate: ['January 15, 2025', Validators.required],
      mainResponsibleDept: ['Agriculture & allied', Validators.required],
      assistingDept: ['Agriculture & allied', Validators.required],
      mainResponsibleOfficial: ['Mrs. XX', Validators.required],
      assistingOfficial: ['Mrs. XX', Validators.required],

      // --- Mega Goal Section (Radio Button Selections) ---
      megaGoalCurrent: this.fb.group(this.createMegaGoalGroup({
        statusLabel: 'Current Status',
        target2030: true,  // Checked in image
        target2035: false,
        target2047: false
      })),
      megaGoalAchieved: this.fb.group(this.createMegaGoalGroup({
        statusLabel: 'Target Achieved',
        target2030: false,
        target2035: true, // Checked in image
        target2047: false
      })),

      // --- Initiative Tracking Table (FormArray) ---
      initiativeTracking: this.fb.array(this.initialInitiativeTracking.map(row => this.createInitiativeTrackingRow(row))),

      // --- Risk and Mitigation Table (FormArray) ---
      riskMitigation: this.fb.array(this.initialRiskMitigation.map(row => this.createRiskMitigationRow(row)))
    });
  }

  // --- Getters for FormArrays ---
  get initiativeTrackingArray(): FormArray {
    return this.trackerForm.get('initiativeTracking') as FormArray;
  }

  get riskMitigationArray(): FormArray {
    return this.trackerForm.get('riskMitigation') as FormArray;
  }

  // --- Helper Methods to Create FormGroups ---

  private createMegaGoalGroup(data: MegaGoalStatus): { [key: string]: any } {
    return {
      statusLabel: [data.statusLabel], // Read-only label
      // These are checkboxes/radio buttons in the image
      target2030: [data.target2030],
      target2035: [data.target2035],
      target2047: [data.target2047]
    };
  }

  private createInitiativeTrackingRow(data: InitiativeTrackingRow): FormGroup {
    return this.fb.group({
      sn: [data.sn],
      initiativeTitle: [data.title], // Static text display
      responsibleDept: [data.responsibleDept, Validators.required], // Select input
      secondResponsible: [data.secondResponsible], // Select input
      currentStatus: [data.currentStatus, Validators.required], // Select input
      dependencyIndicator: [data.dependencyIndicator] // Select input
    });
  }

  private createRiskMitigationRow(data: RiskMitigationRow): FormGroup {
    return this.fb.group({
      sn: [data.sn], // Static text display
      riskDetail: [data.riskDetail], // Static text display
      riskLevel: [data.riskLevel, Validators.required], // Select input
      mitigationPlan: [data.mitigationPlan, Validators.required] // Text input
    });
  }

  // --- Initial Data (Matching the Image Content) ---
  initialInitiativeTracking: InitiativeTrackingRow[] = [
    { sn: 1, title: 'Develop commodity-specific clusters (pilots for 15 mission)', responsibleDept: 'Agriculture & allied', secondResponsible: 'District KVSs', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 2, title: 'Institutionalize a two-pronged State Paddy Mission', responsibleDept: 'Agriculture & allied', secondResponsible: 'State SteerCo', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 3, title: 'Launch Agri & Allied Export Promotion Policy', responsibleDept: 'Agriculture & allied', secondResponsible: 'APEDA', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 4, title: 'Set-up Agri Export Zones in convergence with APEDA', responsibleDept: 'Agriculture & allied', secondResponsible: 'APEDA', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 5, title: "Strong regional brand for Chhattisgarh's produce", responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 6, title: 'Set-up Village Export Hubs in convergence with APEDA', responsibleDept: 'Agriculture & allied', secondResponsible: 'APEDA', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 7, title: 'Foster dedicated market linkages – domestic and global', responsibleDept: 'Agriculture & allied', secondResponsible: 'C&I', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 8, title: 'Scale irrigation-as-a-service – scheme for PAYG via Pvt.', responsibleDept: 'Agriculture & allied', secondResponsible: 'Water', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 9, title: 'Launch an irrigation revolving fund with NABARD', responsibleDept: 'Agriculture & allied', secondResponsible: 'NABARD', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 10, title: 'Develop advanced irrigation infrastructure', responsibleDept: 'Agriculture & allied', secondResponsible: 'Water', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 11, title: 'Launch FPO Mentorship Program with NABARD', responsibleDept: 'Agriculture & allied', secondResponsible: 'NABARD', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 12, title: 'Implement seamless phygital commerce for FPOs', responsibleDept: 'Agriculture & allied', secondResponsible: 'CHiPS', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 13, title: 'Incentivize FPOs registered on national portals', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 14, title: 'Set-up a biotech CoE in Raipur in PPP', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 15, title: 'Develop CG as hub for quality seeds and planting material', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 16, title: 'Orchestrate an R&D Ecosystem – incentivize academia', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 17, title: 'Implement a central land records', responsibleDept: 'Agriculture & allied', secondResponsible: 'CHiPS', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 18, title: 'State wide mission for 30% organic by 2047', responsibleDept: 'Agriculture & allied', secondResponsible: 'Tourism', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 19, title: 'Facilitate climate smart practices like INM', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 20, title: 'Annadaata to Urjadaata: Biofuel Programme', responsibleDept: 'Agriculture & allied', secondResponsible: 'CBDA', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 21, title: 'Launch an Agri Promotion Fund – FOF model', responsibleDept: 'Agriculture & allied', secondResponsible: 'Finance', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 22, title: 'Increase access to KCCs by forming JLGs', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 23, title: 'Ensure price support via organized mandis', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 24, title: 'Mission for private anchors & foreign investment', responsibleDept: 'Agriculture & allied', secondResponsible: 'C&I', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 25, title: 'Utilize KVKs, RIPA and RSICs as district coordinators', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 26, title: 'Set-up ADARSH colleges focused on agriculture', responsibleDept: 'Agriculture & allied', secondResponsible: 'Education', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 27, title: 'Partner with start-ups to implement agri-tech solutions', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 28, title: 'Integrated sensor technologies like drones ', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 29, title: 'Targeted program for agriculturally backward areas', responsibleDept: 'Agriculture & allied', secondResponsible: '', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
    { sn: 30, title: 'Pilot agro-tourism', responsibleDept: 'Agriculture & allied', secondResponsible: 'Tourism', currentStatus: 'To Be Started', dependencyIndicator: 'Pending' },
  ];

  initialRiskMitigation: RiskMitigationRow[] = [
    { sn: 1, riskDetail: 'Low interest of private companies due to poor work visibility.', riskLevel: 'High', mitigationPlan: 'View Plan' },
    { sn: 2, riskDetail: 'Delay in policy approval.', riskLevel: 'Medium', mitigationPlan: 'View Plan' },
  ];

  onSubmit(): void 
  {
    if (this.trackerForm.valid) 
    {
      console.log('Form Submitted!', this.trackerForm.value);
      // API call to save data goes here
    } else {
      console.error('Form is invalid. Please check all required fields.');
      this.trackerForm.markAllAsTouched();
    }
  }
}