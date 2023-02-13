import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pathurl:any;
  showHeaderFooter:boolean;
  constructor(public sto:StorageService,public router:Router){
  //   this.router.events.subscribe((event: NavigationEnd) => {
  //   //   if(event.url == '/login'){
  //   //    this.sto.logoutUser()
  //   // }
  //     this.pathurl=event.url;
  // })  
  }
  ngOnInit(): void {
   
   console.log(this.pathurl)
    //   if(this.pathurl== '/login'){
    //     this.showHeaderFooter=false;
    //     if(!this.sto.isUserLogin()){
    //       console.log('user Log In');
          
    //   }
    // }
  }    

}
