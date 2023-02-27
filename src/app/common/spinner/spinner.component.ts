import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  display:boolean;
  constructor(public storageservice:StorageService) { }

  ngOnInit(): void {
    this.display=this.storageservice.showLoader;
    console.log(this.display,'spinner',this.storageservice.showLoader);
    
  }
  ngAfterContentChecked() {
    this.display=this.storageservice.showLoader;
    console.log(this.display,'display')
     }
}
