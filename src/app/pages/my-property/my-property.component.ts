import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { propertyObj } from 'src/app/model/property';
import { PropertyServiceService } from 'src/app/service/property-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.scss']
})
export class MyPropertyComponent implements OnInit {
  propArr:propertyObj[];
  file:any;
  propertyObject:propertyObj;
  submitted:boolean;
  postPropertymodal:boolean;
  userData:any;
  constructor(public confirmationService:ConfirmationService,public messageService:MessageService,public storage:StorageService,public fb:FormBuilder,public proser:PropertyServiceService) { }

  ngOnInit(): void {
    this.userData= this.storage.getUserData();
    console.log(this.userData,'user data check');
    this.getPropertyById()
  }
  getPropertyById(){
    console.log(typeof this.userData);
    
    let d:any =JSON.parse(this.userData);
    console.log(d.data);
    const id=d.data.id
    this.proser.getPropertyId(id).subscribe((x:any)=>{
      this.propArr=x
      console.log(this.propArr,'data from server');
    })
  }
  openNew(){
    this.propertyObject = {};
    this.propertyObject.addres={};
    this.postPropertymodal=true;
    this.submitted = false;
  }
  saveproperty(){
    this.submitted = true;
    console.log('CHECK OBJ',this.propertyObject)

    let d:any =JSON.parse(this.userData);
    const id=d.data.id;
    const name=d.data.username
    this.propertyObject.username=name
    this.propertyObject.userID=d.data.id;
    if(this.propertyObject._id){
this.proser.updateProperty(this.propertyObject,this.propertyObject._id).subscribe(x=>{
    console.log(x)
    if(x){
      this.messageService.add({severity:'warn', summary:'Update', detail:'Successfull Update Property',life:2000});    
      this.getPropertyById()
    }
})
    }
    else{
      this.proser.addProperty(this.propertyObject).subscribe((x:any)=>{
        if(x){
          this.messageService.add({severity:'success', summary:'Save', detail:'Successfull Property Save',life:2000});    
          this.getPropertyById()
        }
      })
    }
    this.postPropertymodal=false;
  }
  editProperty(product){
    this.propertyObject = {...product};
    this.postPropertymodal=true
  }
  myUploader($event){
    console.log(event.target,this.file,'file check')
  }
  deleteProp(product){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proser.removeProperty(product,product._id).subscribe(x=>{
          if(x){
            this.messageService.add({severity:'error', summary:'Deleted', detail:'Successfull deleted Property',life:2000});    
            this.getPropertyById()
          }
          })
        
      }
  });
      
  }
}
