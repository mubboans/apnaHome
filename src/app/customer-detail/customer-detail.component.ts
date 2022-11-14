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
  customer:Customer;
  custmodal:boolean
  submitted:boolean;
  constructor(public auth:AuthlogService,public mssg:MessageService) { }

  ngOnInit(): void {
    this.customer=new Customer()
    this.auth.getUsers().subscribe(x=>{
   
      this.cust=x
      console.log(this.cust,"Customer data")
    })
  }
  SaveCust(){
    this.submitted = true;

    if (this.customer.cname.trim()) {
        if (this.customer.id) {
          // this.expenses.status=1
          this.customer.added_on="10/12/2022"
            this.cust[this.findIndexById(this.customer.id)] = this.customer;                
            this.mssg.add({severity:'success', summary: 'Successful', detail: 'Expense Updated', life: 3000});
        }
        else {
          // this.expenses.status=1
          // this.expenses.merchantorder=this.createMerId();
            this.customer.id = this.createId();
            this.customer.added_on="10/12/2022"
            // this.expenses.added_by = 'Users';
            this.cust.push(this.customer);
            this.mssg.add({severity:'success', summary: 'Successful', detail: 'Expense Created', life: 3000});
        }
  
        this.cust = [...this.cust];
        // localStorage.setItem("trim",JSON.stringify(this.expes))
        this.custmodal = false;
        this.customer = {};
  }
}
  createId(): string {
    let id = '';
    var chars = '012345678987874975149874198745498745774987798494474';
    for ( var i = 0; i < 2; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.cust.length; i++) {
        if (this.cust[i].id === id) {
            index = i;
            break;
        }
    }
  
    return index;
  }
  openNew(){
    this.customer=new Customer()
    this.submitted = false;
    this.custmodal = true;
  }
  editCust(cus: Customer) {
    this.customer = {...cus};
    this.custmodal = true;
    // localStorage.setItem("trim",JSON.stringify(this.expes))
    // this.dataviewData=JSON.parse(localStorage.getItem("trim"))
  }
  
  del(cus: Customer){
    this.cust = this.cust.filter(val => val.id !== cus.id);
    this.customer = {};
    this.mssg.add({severity:'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000});
  }
}
export class Customer{
   public id?:string;
   public cname?:string;
   public cemail?:string;
   public country?:string;
   public zipcode?:number;
   public state?:string;
   public city?:string;
   public added_on?:string;
   public contact?:number;
   public company?:string;
   public address?:string;
   public shipaddress?:string;
   public product?:string;
   public expedelivery?:string; 
   public method?:string;
   public bcountry?:string;
   public bstate?:string;
   public bcity?:string;
   public bzip?:string;
   public baddress?:string;

    public scountry?:string;
   public sstate?:string;
   public sbcity?:string;
   public szip?:string;
   public saddress?:string;

   public note?:string;

}