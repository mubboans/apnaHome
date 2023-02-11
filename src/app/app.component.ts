import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public sto:StorageService,public router:Router){
  }
  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
        if(event.url == '/login'){
         this.sto.logoutUser()
      }
    })  
  }    

}
