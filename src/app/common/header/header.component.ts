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
  uname:string;
  activeItem: MenuItem;
  useremail:string;
  showEmailDialog:boolean=false;
  userdata:any;
  imgurl:string;
  userrole:string;
  ngOnInit(): void {

   this.userdata=JSON.parse(this.sto.getUserData())
   const d=this.userdata.data
   this.uname=d.username;
   this.useremail=d.email;
   this.imgurl=this.userdata.profimg;
   this.userrole=d.user_role
   console.log(this.userdata,'Check',this.imgurl,d);
    if(this.useremail == 'demo@gmail.com'){
      this.showEmailDialog=true;
    }
    this.items = [

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
      label:'Rent',
      routerLink:'rental',icon: 'pi pi-fw pi-home',
    },
    {
      label:'Admin',
      routerLink:'admin',
      icon: 'pi pi-fw pi-briefcase',
      visible:d.user_role == 1
    }

  ];

  }
  routeProfile(){
    this.router.navigate(['/profile'])
  }
  fnLogout(){
    this.sto.logoutUser()
  }
}
