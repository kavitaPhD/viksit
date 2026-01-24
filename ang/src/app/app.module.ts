import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './fullcomponent/header/header.component';
import { FooterComponent } from './fullcomponent/footer/footer.component';
import { HomeComponent } from './fullcomponent/home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdComponentModule } from './md-components/md-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutComponent } from './about/about.component';
import { DownloadComponent } from './download/download.component';
import { PhotogalleryComponent } from './photogallery/photogallery.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ThemedetailsComponent } from './themedetails/themedetails.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    AboutComponent,
    DownloadComponent,
    PhotogalleryComponent,
    GuidelinesComponent,
    ContactusComponent,
    ThemedetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdComponentModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgApexchartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('token');
        },
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
