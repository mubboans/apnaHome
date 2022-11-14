import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { AuthlogService } from '../service/authlog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
displayModal:boolean;
cars:any[]
caty:any

constructor(public auth:AuthlogService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
expes:Expo[];
expenses:Expo;
submitted:boolean;
dataa:any[]
selectedCity:any;
cities: any[];
foods: any[];
storageModal:boolean;
dataviewData:any[];
expi:Expo;
  ngOnInit(): void {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  this.foods = [
    {name: 'Chicken', code: 'NY'},
    {name: 'Veg', code: 'RM'},
    {name: 'Eggs', code: 'LDN'},
    {name: 'Deserts', code: 'IST'},
    {name: 'Drinks', code: 'PRS'}
];
    this.expenses=new Expo();
    this.expenses.category=new Caty()
    this.cars=[{
      id:111,name:'mubashir'
    },{
      id:222,name:'musaddik'
    }]
  
    this.getProduct()
  }
  getProduct(){
    this.auth.getProducts().subscribe((x:any[]) => {
      console.log(x)
      this.expes = x
      this.dataa=x.map(x=>x.history)
  
      console.log(this.expes,"detail chekc",this.dataa)
    });
  }
showModalDialog(){

}
fnProcessing(order: Expo){ 
  this.processStatus(order.id, 2,order);
}
processStatus(id:string,status:number,ep:Expo){
  this.expi=ep
    this.expi.id = id;
    this.expi.status = status;
    console.log(this.expi,"data check")
    this.expes=[...this.expes]
    // this.auth.postOrderStatus(this.expi).subscribe(() => {
    //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Processed', life: 3000 });
    //   this.getProduct();
    // })
  
}
fnShipping(order: Expo){  
  this.processStatus(order.id, 3,order);
}
fnCompleted(order: Expo){ 
  this.processStatus(order.id, 4,order);
}
openNew() {

  this.expenses = {};
  this.submitted = false;
  this.displayModal = true;
}

// deleteSelectedProducts() {
//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete the selected products?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//           this.expes = this.expes.filter(val => !this.selectedExpos.includes(val));
//           this.selectedExpos = null;
//           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Expos Deleted', life: 3000});
//       }
//   });
// }

editExpo(expenses: Expo) {
  this.expenses = {...expenses};
  this.displayModal = true;
  // localStorage.setItem("trim",JSON.stringify(this.expes))
  // this.dataviewData=JSON.parse(localStorage.getItem("trim"))
}

del(expenses: Expo){
  this.expes = this.expes.filter(val => val.id !== expenses.id);
  this.expenses = {};
  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000});
}
localData(){
  this.storageModal=true
}

hideDialog() {
  this.displayModal = false;
  this.submitted = false;
}
addhistory(){
  const item = new History();
  this.expenses.history.push(item)
}
saveProduct() {
  this.submitted = true;

  if (this.expenses.cname.trim()) {
      if (this.expenses.id) {
        this.expenses.status=1

          this.expes[this.findIndexById(this.expenses.id)] = this.expenses;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Expense Updated', life: 3000});
      }
      else {
        this.expenses.status=1
        this.expenses.merchantorder=this.createMerId();
          this.expenses.id = this.createId();
          this.expenses.added_by = 'Users';
          this.expes.push(this.expenses);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Expense Created', life: 3000});
      }

      this.expes = [...this.expes];
      // localStorage.setItem("trim",JSON.stringify(this.expes))
      this.displayModal = false;
      this.expenses = {};
      // this.dataviewData=JSON.parse(localStorage.getItem("trim"))
  }
  
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.expes.length; i++) {
      if (this.expes[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

createMerId(): string {
  let id = '';
  var chars = '01234567898787497514987419874549874577498779849447445489449848840123456789';
  for ( var i = 0; i < 4; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
createId(): string {
  let id = '';
  var chars = '012345678987874975149874198745498745774987798494474';
  for ( var i = 0; i < 2; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

}
export class Expo{
  merchantorder?:string;
  public Country?:string;
  cemail?:string;
  company?:string;
  country?:string;
  state?:string;
  city?:string;
  zipcode?:string;
  brand?:string;
  cname?:string;
  expedelidate?:string;
  product?:number;
  orderquantity?:number;
  confirmquantity?:string;
  public address?:string;
  public shipaddress?:string;
  public expedelivery?:string; 
  public method?:string;
  orderdate?:string;
  


  public expensename?:string;
  public expensedetail?:string;
  public category?:Caty;
  public date?:string;
  public isRecoverable?:boolean;
  public added_by?:string;
  public added_on?:string;
  public history?:Array<any>;
  public id?:string;
  public contact?:string;
  public status?:number;
}
export class History{
  public id?: number;     
  public event?: string; 
  public date?: string;
}
export class Caty{
public id?:number;
public name?:string;
public foods?:string;
public travels?:string;
}
