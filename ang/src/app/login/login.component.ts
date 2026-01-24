import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{

  public loginForm: FormGroup;

  public errorText: string = "";
  public showCaptchaError: boolean = false;
  public showInvalid: boolean = false; public pass :any;

  @ViewChild('close') closeModal: ElementRef | undefined;
  @ViewChild('dataContainer', { static: false }) dataContainer: ElementRef | undefined;

  public svg: any = [];
  constructor(private router: Router, public translate: TranslateService, private fb: FormBuilder, private http: HttpClient, private ds: DataService,
    private authService: AuthService) 
    {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
      captchaText: [''],
      id: [''],

    });
  }

  ngOnInit(): void 
  {
    this.svgcaptcha();
  }

  svgcaptcha() 
  {
    this.http.get(environment.rootUrl + 'captcha').subscribe(res => 
    {
      this.svg = res;
      this.dataContainer.nativeElement.innerHTML = this.svg.data;
      this.loginForm.patchValue({ captchaText: this.svg.text })
    },
      error => {
        this.errorText = 'Something bad happened; please try again later.';
      });
  }

  refresh()
  {
    window.location.reload();
  }

  isValidInput(fieldName: any): boolean 
  {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  onPassChangeEvent(event: any) 
  {
    var str = event.target.value.concat('SDG%&456'.toString());
    this.pass = CryptoJS.SHA512(str);
    this.loginForm.patchValue
      ({
        password: this.pass.toString()
      });
    this.loginForm.value.password = this.pass;
  }


  login() 
  {
    if (this.loginForm.valid && this.loginForm.get('captcha').value === this.loginForm.get('captchaText').value) 
    {
      this.authService.login(this.loginForm.value).subscribe(res => 
      {
        if (res['success'] == 1) 
        {        
            console.log("heloo", res['success'], res['role']);
            switch (res['role']) 
            {
              case 1:
                {
                  this.router.navigate(['/cmo/cmodashboard']);
                  break;
                }               
              case 2:
                {
                  this.router.navigate(['/department/departmentdashboard']);
                  break;
                }                
              case 3:
                {
                  this.router.navigate(['/cs/csdashboard']);
                  break;
                }
              case 4:
                {                  
                  this.router.navigate(['/rna/rnadashboard']);
                  break;
                } 
              default:
              {
                  Swal.fire({
                    icon: 'error',
                    text: 'Please Check Login Details',
                    timer: 5000
                  });
                  break;
                }
              }
        }          
        else 
        {
            Swal.fire({
              icon: 'error',
              text: 'Please check login Details',
              timer: 5000
            });
        }
      });
    }
    else {
      this.showCaptchaError = true;
      setTimeout(() => {
        this.showCaptchaError = false;
      }, 3000);
    }
  } 

}
