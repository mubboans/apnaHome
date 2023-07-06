import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:User;
userID:any;
profimg:string;
  constructor(public userservice:UserService,public publicsto:StorageService,public confirmationService:ConfirmationService,public messageService:MessageService) { }

  ngOnInit(): void {
    let userdetail=JSON.parse(this.publicsto.getUserData())
    this.profimg=userdetail.profimg;
    console.log(userdetail,'Check');
    const d=userdetail.data
    this.user=userdetail 
  this.userID=d.id;
    this.getUserbyId(this.userID);

  }
  delUser(){
    this.userservice.deleteUserbyId(this.userID).subscribe((x:any)=>{
      if(x.success){
        this.messageService.add({severity:'error', summary:'Delete', detail:'Deleted Successfull Users',life:2000}); 
      }
    })
  }
  getRole(text){
    switch(text){
      case "1":
      return 'Admin' 
      case "2":
      return 'Users'
      default :
      return 'Checking'
    }
  }
  updateuser(){
    let data = {
      username: this.user.username,
      password:this.user.password,
      email:this.user.email,
      type:this.user.type,
      confirmpassword:this.user.confirmpassword
    }
    this.userservice.updateUserbyId(this.user._id,data).subscribe((x:any)=>{
      console.log(x)
      if(x.success){
        this.messageService.add({severity:'custom', summary:'Update', detail:'Successfull Update Profile',life:2000});    
        this.getUserbyId(this.user._id);
      }
    })
  }
  getUserbyId(id){
    this.userservice.getUserbyId(id).subscribe((x:any)=>{
      console.log(x);
    this.user=x.data
    })
  }
}
