import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { PropertyServiceService } from 'src/app/service/property-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  property:any[];
  propertyobj:any;
  productDialog: boolean;
  selectedProducts: any[];
  submitted: boolean;
  sortOrder: number;
  sortField: string;
  sortOptions: any[];
  constructor(public confirmationService:ConfirmationService,public messageService:MessageService,public storage:StorageService,public fb:FormBuilder,public proser:PropertyServiceService) { }

  ngOnInit(): void {
    this.getProperty(); 
  }
  getProperty(){
    this.proser.getProperty().subscribe((x:any)=>{
      this.property=x
      console.log(this.property,'data from server');
      
    })
  }
  openNew() {
    this.propertyobj = {};
    this.submitted = false;
    this.productDialog = true;
}
deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // this.products = this.products.filter(val => !this.selectedProducts.includes(val));

          this.selectedProducts = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}
  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
editProduct(propertyobj) {
  this.propertyobj = {...propertyobj};
  this.productDialog = true;
}


deleteProduct(product){
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + product.name + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.proser.removeProperty(product,product._id).subscribe(x=>{
        if(x){
          this.messageService.add({severity:'error', summary:'Deleted', detail:'Successfull deleted Property',life:2000});    
          this.getProperty()
        }
        })
      
    }
});
    
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

saveProduct() {
  this.submitted = true;
  if(this.propertyobj._id){
    this.proser.updateProperty(this.propertyobj,this.propertyobj._id).subscribe(x=>{
        console.log(x)
        if(x){
          this.messageService.add({severity:'warn', summary:'Update', detail:'Successfull Update Property',life:2000});    
          this.getProperty()
        }
    })
        }
        else{
          this.proser.addProperty(this.propertyobj).subscribe((x:any)=>{
            if(x){
              this.messageService.add({severity:'success', summary:'Save', detail:'Successfull Property Save',life:2000});    
              this.getProperty()
            }
          })
        }

      this.productDialog = false;
  
}
}
