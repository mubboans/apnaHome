import { formatDate } from '@angular/common';
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
  tempimage:File;
  propertyObject:propertyObj;
  submitted:boolean;
  postPropertymodal:boolean;
  userData:any;
  formData:FormData;
  reader:FileReader;
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
      this.propArr=x.data
      console.log(this.propArr,'data from server');
    })
  }
  openNew(){
    this.formData = new FormData();
    this.propertyObject = {};
    this.propertyObject.address={};
    this.postPropertymodal=true;
    this.submitted = false;
   
  }
  handleUpload(event) {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.formData.append('tempimage',file);
    }
   else{

   }

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
      this.formData.append('name',this.propertyObject.name);
      this.formData.append('price',this.propertyObject.price);
      this.formData.append('userID',this.propertyObject.userID);
      this.formData.append('username',this.propertyObject.username);
      this.formData.append('state',this.propertyObject.address.state);
      this.formData.append('city',this.propertyObject.address.city);
      this.formData.append('pincode',this.propertyObject.address.pincode);
      this.formData.append('address',this.propertyObject.address.add);
this.proser.updateProperty(this.formData,this.propertyObject._id).subscribe(x=>{
    console.log(x)
    if(x){
      this.messageService.add({severity:'warn', summary:'Update', detail:'Successfull Update Property',life:2000});    
      this.getPropertyById()
    }
})
    }
    else{
      let add: any=this.propertyObject.address;
      // console.log(typeof this.tempimage);
      
      this.formData.append('name',this.propertyObject.name);
      this.formData.append('price',this.propertyObject.price);
      this.formData.append('userID',this.propertyObject.userID);
      this.formData.append('username',this.propertyObject.username);
      this.formData.append('state',this.propertyObject.address.state);
      this.formData.append('city',this.propertyObject.address.city);
      this.formData.append('pincode',this.propertyObject.address.pincode);
      this.formData.append('address',this.propertyObject.address.add);
      this.formData.forEach((key,value)=>{
        console.log(`${value}-${key}`);
        
       })
      this.proser.addProperty(this.formData).subscribe((x:any)=>{
        if(x.success){
          this.messageService.add({severity:'success', summary:'Save', detail:'Successfull Property Save',life:2000});    
          this.getPropertyById()
        }
      },(err)=>{
        console.log(err);
        this.messageService.add({severity:'error', summary:err.error.error, detail:err.error.mesagge,life:2000});    
      })
    }
    this.postPropertymodal=false; 
  }
  editProperty(product){
    this.formData = new FormData();
    this.propertyObject = {...product};
    this.postPropertymodal=true
  }
  // myUploader($event){
  //   console.log(event.target,this.tempimage,'file check')
  // }
  deleteProp(product){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proser.removeProperty(product,product._id).subscribe((x:any)=>{
          if(x.status){
            this.messageService.add({severity:'error', summary:'Deleted', detail:'Successfull deleted Property',life:2000});    
            this.getPropertyById()
          }
          })
        
      }
  });
      
  }
}
