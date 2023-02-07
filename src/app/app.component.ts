import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public sto:StorageService){}
  ngOnInit(): void {
    console.log(this.sto.isUserLogin());
    
  }
  title = 'lazy-load-sample';

}
