import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  public cgsvgall: FormGroup; //add  FormGroup 
  public compositescore: any = [];


  public DT01: any;
  public DT01T: any;

  public DT02: any;
  public DT02T: any;

  public DT03: any;
  public DT03T: any;

  public DT04: any;
  public DT04T: any;

  public DT05: any;
  public DT05T: any;

  public DT06: any;
  public DT06T: any;

  public DT07: any;
  public DT07T: any;

  public DT08: any;
  public DT08T: any;

  public DT09: any;
  public DT09T: any;

  public DT10: any;
  public DT10T: any;

  public DT11: any;
  public DT11T: any;

  public DT12: any;
  public DT12T: any;

  public DT13: any;
  public DT13T: any;

  public DT14: any;
  public DT14T: any;

  public DT15: any;
  public DT15T: any;

  public DT16: any;
  public DT16T: any;

  public DT17: any;
  public DT17T: any;

  public DT18: any;
  public DT18T: any;

  public DT19: any;
  public DT19T: any;

  public DT20: any;
  public DT20T: any;

  public DT21: any;
  public DT21T: any;

  public DT22: any;
  public DT22T: any;

  public DT23: any;
  public DT23T: any;

  public DT24: any;
  public DT24T: any;

  public DT25: any;
  public DT25T: any;

  public DT26: any;
  public DT26T: any;

  public DT27: any;
  public DT27T: any;

  public DT28: any;
  public DT28T: any;

  public DT29: any;
  public DT29T: any;

  constructor(private fb: FormBuilder) {

    this.cgsvgall = this.fb.group({ //definition to cons

    });

  }

  ngOnInit(): void {

    this.getcgmap();
  }

  getcgmap() {
    this.DT01 = '#dd1e47';
    this.DT01T = "Balod";
    this.DT02 = '#6D75F7';
    this.DT02T = "Balodabazar";
    this.DT03 = '#15D54C';
    this.DT03T = "Balrampur";
    this.DT04 = '#BDA91E';
    this.DT04T = "Bastar";
    this.DT05 = '#1DF31A';
    this.DT05T = "Bemetara";
    this.DT06 = '#EBEE29';
    this.DT06T = "Bijapur";
    this.DT07 = '#EBEE29';
    this.DT07T = "Bilaspur";


    this.DT08 = '#F3311A';
    this.DT08T = "Dantewada";
    this.DT09 = '#BDA91E';
    this.DT09T = "Dhamtari";
    this.DT10 = '#F3311A';
    this.DT10T = "Durg";
    this.DT11 = '#EBEE29';
    this.DT11T = "Gariaband";

    this.DT12 = '#dd1e47';
    this.DT12T = "Janjgir Champa";
    this.DT13 = '#6D75F7';
    this.DT13T = "Jaspur";
    this.DT14 = '#15D54C';
    this.DT14T = "Kanker";
    this.DT15 = '#BDA91E';
    this.DT15T = "Kabirdham";
    this.DT16 = '#1DF31A';
    this.DT16T = "Kondagaon";
    this.DT17 = '#EBEE29';
    this.DT17T = "Korba";
    this.DT18 = '#F3311A';
    this.DT18T = "Korea";
    this.DT19 = '#BDA91E';
    this.DT19T = "Mahasamund";
    this.DT20 = '#F3311A';
    this.DT20T = "Mungeli";
    this.DT21 = '#EBEE29';
    this.DT21T = "Narayanpur";

    this.DT22 = '#EE3829';
    this.DT22T = "Raigarh";
    this.DT23 = '#F3311A';
    this.DT23T = "Raipur";
    this.DT24 = '#EBEE29';
    this.DT24T = "Rajnandgaon";
    this.DT25 = '#F3311A';
    this.DT25T = "Sukma";
    this.DT26 = '#EBEE29';
    this.DT26T = "Surajpur";
    this.DT27 = '#F3311A';
    this.DT27T = "Surguja";

    this.DT28 = '#EE3829';
    this.DT28T = "Gaurella - Pendra - Marwahi";

    this.DT29 = '#29EEE8'; //for all new districts



  }//function-end


}
