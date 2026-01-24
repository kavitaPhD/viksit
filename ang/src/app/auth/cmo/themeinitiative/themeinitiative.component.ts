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

export interface Theme {
  id: string;
  title: string;
  desc?: string;
  colorClass?: string;
  initials?: string;
  route?: string;
  icon?: string;
}

export interface ThemeGroup {
  title: string;
  color: string;   // background banner color
  themes: Theme[];
}

export const themeGroups: ThemeGroup[] = [
  {
    title: 'Economic Development',
    color: '#D9534F', // red
    themes: [
      { id: 'agriculture', title: 'Agriculture', desc: 'Powerhouse of Agricultural Produce & Processed Superfoods.', colorClass: 'bg-warning', initials: 'A', route: '/themes/agriculture', icon: 'agriculture' },
      { id: 'mfp-herbals', title: 'MFPs & Herbals', desc: 'Hub for MFP & Herbals', colorClass: 'bg-secondary', initials: 'M', route: '/themes/mfps-herbals', icon: 'spa' },
      { id: 'industry', title: 'Industry', desc: 'Titan in Industry.', colorClass: 'bg-secondary', initials: 'In', route: '/themes/industry', icon: 'factory' },
      { id: 'tourism', title: 'Tourism', desc: 'Tourism – Celebrating Natural & Cultural Tapestry', colorClass: 'bg-primary', initials: 'T', route: '/themes/tourism', icon: 'travel_explore' },
      { id: 'logistics', title: 'Logistics', desc: 'Leader in Inland Logistics.', colorClass: 'bg-primary', initials: 'L', route: '/themes/logistics', icon: 'local_shipping' },
      { id: 'it-services', title: 'IT Services', desc: 'Expansion into AI & IT Services.', colorClass: 'bg-dark', initials: 'IT', route: '/themes/it-services', icon: 'computer' }
    ]
  },

  {
    title: 'Social Development',
    color: '#F0AD4E', // orange
    themes: [
      { id: 'education', title: 'Education', desc: 'Land of Innovation, Skilled Human Capital & Quality Education.', colorClass: 'bg-primary', initials: 'E', route: '/themes/education', icon: 'school' },
      { id: 'health', title: 'Health', desc: 'A Healthy & Prospering Society.', colorClass: 'bg-success', initials: 'H', route: '/themes/health', icon: 'health_and_safety' },
      { id: 'sustainability', title: 'Sustainability', desc: 'Leader in Sustainable & Renewables-led Development.', colorClass: 'bg-info', initials: 'Su', route: '/themes/sustainability', icon: 'eco' },
      { id: 'art-culture', title: 'Art & Culture', desc: 'Art & Culture Capital of India.', colorClass: 'bg-success', initials: 'AC', route: '/themes/art-culture', icon: 'palette' }
    ]
  },

  {
    title: 'Enablers – Infrastructure, Governance & Investment',
    color: '#5BC0DE', // blue
    themes: [
      { id: 'social-infra', title: 'Social Infrastructure', desc: 'Infrastructure for Thriving Communities.', colorClass: 'bg-success', initials: 'S', route: '/themes/social-infrastructure', icon: 'location_city' },
      { id: 'governance', title: 'Governance', desc: 'Governance for Lasting Value Creation.', colorClass: 'bg-warning', initials: 'G', route: '/themes/governance', icon: 'gavel' },
      { id: 'investment', title: 'Investment', desc: 'Premier Investment Destination.', colorClass: 'bg-info', initials: 'I', route: '/themes/investment', icon: 'trending_up' }
    ]
  }
];
/////////////////////////////////////////////////////////////
@Component({
  selector: 'app-themeinitiative',
  templateUrl: './themeinitiative.component.html',
  styleUrls: ['./themeinitiative.component.scss']
})
export class ThemeinitiativeComponent implements OnInit 
{
  public themeGroups: ThemeGroup[] = themeGroups;
  public count = 1;
  public selectedThemeTitle: string = '';

  constructor(private router: Router, private fb: FormBuilder, public ds: DataService, private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSelect(theme: Theme) 
  {    
    this.selectedThemeTitle = theme.title;
    this.router.navigate(
      ['/cmo/themewiseprogress'],
      { queryParams: { theme: theme.title } }
    );
  }

}
