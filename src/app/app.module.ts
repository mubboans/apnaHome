import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DataViewModule} from 'primeng-lts/dataview';
import {MenubarModule} from 'primeng-lts/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './service/jwt.interceptor';

import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SharedModule } from './sharedModule/shared.module';
import { LoginComponent } from './auth-component/login/login.component';
import { RegisterComponent } from './auth-component/register/register.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TimelinecardComponent } from './pages/timelinecard/timelinecard.component';
import { MyPropertyComponent } from './pages/my-property/my-property.component';
import { AppInitService, initializeApp1 } from './helper/app-init.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CustomerDetailComponent,
    ProductListComponent,
    SidebarComponent,
    RegisterComponent,
     SpinnerComponent,
    DashboardComponent,
    TimelinecardComponent,
    MyPropertyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    AppRoutingModule,   
    CommonModule,
    FormsModule,   
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
   AppInitService,
   {provide:APP_INITIALIZER,useFactory:initializeApp1,deps:[AppInitService],multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true}
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
