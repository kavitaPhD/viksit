import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './fullcomponent/home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { DownloadComponent } from './download/download.component';
import { PhotogalleryComponent } from './photogallery/photogallery.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ThemedetailsComponent } from './themedetails/themedetails.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'download',
    component: DownloadComponent
  },
  {
    path: 'gallery',
    component: PhotogalleryComponent
  },
  {
    path: 'guidelines',
    component: GuidelinesComponent
  },
  {
    path: 'themedetails/:themeid',
    component: ThemedetailsComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: '',
    component: AuthComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'cmo', loadChildren: () => import('./auth/cmo/cmo.module').then(m => m.CmoModule) },
      { path: 'cs', loadChildren: () => import('./auth/cs/cs.module').then(m => m.CsModule) },
      { path: 'department', loadChildren: () => import('./auth/department/department.module').then(m => m.DepartmentModule) }
      
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
