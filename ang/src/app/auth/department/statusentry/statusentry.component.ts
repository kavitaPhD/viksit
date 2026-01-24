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
  selector: 'app-statusentry',
  templateUrl: './statusentry.component.html',
  styleUrls: ['./statusentry.component.scss']
})
export class StatusentryComponent implements OnInit {

  public statusForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    public ds: DataService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      projectName: ['', Validators.required],
      workId: [''],
      location: [''],
      lastUpdated: [''],

      mainDepartment: [''],
      supervisingOfficer: [''],
      supportingDept: [''],
      district: [''],

      // timeline options
      targetYear: [''],

      // task tracker
      taskTracker: this.fb.array([
        this.createTaskRow()
      ]),

      // checkpoints section
      checkpoints: this.fb.array([
        this.createCheckpointRow()
      ])
    });
  }

  // ---------- Task Row ----------
  createTaskRow(): FormGroup {
    return this.fb.group({
      taskDescription: [''],
      responsibleDept: [''],
      assistingDept: [''],
      currentStatus: [''],
      statusIndicator: [''],
      remarks: ['']
    });
  }

  addTaskRow() {
    this.taskTracker.push(this.createTaskRow());
  }

  get taskTracker(): FormArray {
    return this.statusForm.get('taskTracker') as FormArray;
  }

  // ---------- Checkpoint Row ----------
  createCheckpointRow(): FormGroup {
    return this.fb.group({
      checkpointName: [''],
      plannedDate: [''],
      actualDate: [''],
      status: ['']
    });
  }

  addCheckpointRow() {
    this.checkpoints.push(this.createCheckpointRow());
  }

  get checkpoints(): FormArray {
    return this.statusForm.get('checkpoints') as FormArray;
  }

  // ---------- Submit ----------
  onSubmit() {
    if (this.statusForm.valid) {
      console.log(this.statusForm.value);
      alert('Form submitted!');
    }
  }
}
