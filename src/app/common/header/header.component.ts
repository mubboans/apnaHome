import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api/menuitem';
import {TabMenuModule} from 'primeng-lts/tabmenu';
import {MenubarModule} from 'primeng-lts/menubar';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sto:StorageService,public router:Router) { }
  items: MenuItem[];
  menuitem: MenuItem[];
  uname:string;
  activeItem: MenuItem;
  selectedCity1:string;
  cities: any[];
  userdata:any
  ngOnInit(): void {
   this.userdata=JSON.parse(this.sto.getUserData())
   console.log(this.userdata,'Check');
   const d=this.userdata.data
   this.uname=d.username;
    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
    this.items = [
    //   {
    //     label:'Order List',
    //     url:'productlist'

    // },
    {
      label:'Dashboard',routerLink:'dashboard', icon: 'pi pi-fw pi-chart-bar',
    },
    {
      label:'My Property',
      routerLink:'my-property', icon: 'pi pi-fw pi-envelope',
    },
    {
      label:'Privacy',
      routerLink:'privacy', icon: 'pi pi-fw pi-lock',
    },
    {
        label:'About',
        routerLink:'about', icon: 'pi pi-fw pi-info-circle',
    },
    {
      label:'Rent',
      routerLink:'rental',icon: 'pi pi-fw pi-home',
    },
    {
      label:'Admin',
      routerLink:'admin',
      icon: 'pi pi-fw pi-briefcase',
      visible:d.user_role == 1
    }
    // {
    //     label:'Customer List',
    //     url:'customerlist'  
    // },
    
    
  ];
//   this.menuitem = [
//     {label: 'lingerie', icon: 'pi pi-fw pi-home'},
//     {label: 'sleepwwear', icon: 'pi pi-fw pi-calendar'},
//     {label: 'robes', icon: 'pi pi-fw pi-pencil'},
//     {label: 'swimwear & coverups', icon: 'pi pi-fw pi-file'},
//     {label: 'stocking & hosiery', icon: 'pi pi-fw pi-cog'},
//     {label: 'satin', icon: 'pi pi-apple'},
//     {label: 'plus size', icon: 'pi pi-fw pi-book'},
//     {label: 'loungewear', icon: 'pi pi-fw pi-thumbs-up'},
// ];
  }
  routeProfile(){
    this.router.navigate(['/profile'])
  }
  fnLogout(){
    this.sto.logoutUser()
  }
}
