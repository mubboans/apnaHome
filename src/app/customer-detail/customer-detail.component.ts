import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng-lts/api';
import { AuthlogService } from '../service/authlog.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  cust:Customer[];
  constructor(public auth:AuthlogService,public mssg:MessageService) { }

  ngOnInit(): void {

    this.auth.getUsers().subscribe(x=>{
   
      this.cust=x
      console.log(this.cust,"Customer data")
    })
  }

}
export class Customer{
   public id?:number;
   public cname?:string;
   public cemail?:string;
   public country?:string;
   public zipcode?:number;
   public state?:string;
   public city?:string;
   public added_on?:string;
   public contact?:number;
}