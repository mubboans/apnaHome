import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-component/login/login.component';
import { RegisterComponent } from './auth-component/register/register.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { RouteGuardGuard } from './helper/route-guard.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyPropertyComponent } from './pages/my-property/my-property.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RentalComponent } from './pages/rental/rental.component';

import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path:'productlist',component:HomeComponent,canActivate:[]
  },
  {
    path:'dashboard',component:DashboardComponent,canActivate:[RouteGuardGuard]
  },
  {
    path:'customerlist',component:CustomerDetailComponent,canActivate:[]
  }
  ,
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
path:'rental',component:RentalComponent
  },
  {
    path:'my-property',component:MyPropertyComponent,canActivate:[RouteGuardGuard]
  },
  {
    path:'about',component:AboutComponent,canActivate:[RouteGuardGuard]
  },
  {
  path:'privacy',component:PrivacyComponent,canActivate:[RouteGuardGuard]
  },
  {path:'admin',component:AdminComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
