import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MENUITEMS } from './menu';
import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit 
{
  mobileQuery: MediaQueryList;
  public menuItems: any;
  public userrole: any;
  private _mobileQueryListener: () => void;
  public currentUser: any; public status: any; public mpidata: any = [];

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(changeDetectorRef: ChangeDetectorRef, public ds: DataService,
    media: MediaMatcher, public platform: Platform, private router: Router, private authService: AuthService) 
  {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() 
  {
    this.status = 1;
    this.userrole = "ADMIN";
    this.currentUser = this.authService.currentUser;
    this.menuItems = MENUITEMS[this.currentUser.role];  
  }
  

  toggleSubmenu(item: any): void 
  {
    item.expanded = !item.expanded;
  }

  ngOnDestroy(): void 
  {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() { }

  logout() 
  {
    this.authService.logout();
  }
}
