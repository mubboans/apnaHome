import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public storage:StorageService) { }

  ngOnInit(): void {
    const d=this.storage.getUserData();
    console.log(d,'local data');
  }
  
}
