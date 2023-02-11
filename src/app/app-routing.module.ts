import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-component/login/login.component';
import { RegisterComponent } from './auth-component/register/register.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { RouteGuardGuard } from './helper/route-guard.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyPropertyComponent } from './pages/my-property/my-property.component';

import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path:'productlist',component:HomeComponent,canActivate:[]
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
    path:'dashboard',component:DashboardComponent,canActivate:[RouteGuardGuard]
  },
  {
    path:'my-property',component:MyPropertyComponent,canActivate:[RouteGuardGuard]
  },
  {path:'',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
