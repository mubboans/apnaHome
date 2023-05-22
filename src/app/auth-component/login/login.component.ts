import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthlogService } from 'src/app/service/authlog.service';
import { StorageService } from 'src/app/service/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng-lts/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // username:string;
  // password:string;
  logForm:FormGroup;
  constructor(private messageService: MessageService,public storage:StorageService,public authlog:AuthlogService,public fb:FormBuilder,public route:Router) {
    this.logForm=fb.group({
      username:fb.control('',Validators.required),
      password:fb.control('',Validators.required)
    })
    storage.logoutUser();
   }

  ngOnInit(): void {
    const k=this.storage.isUserLogin()
    console.log(k);
    
  }
  openGoogle(){
    
    this.authlog.fnRegisterWithGoogle().subscribe((x:any)=>{
      console.log(x);
      if(x.success){
        this.messageService.add({severity:'success', summary:'Verify User', detail:'Successfull Login',life:2000});    
        setTimeout(()=>{
          this.storage.setUserData(x);
          this.route.navigate(['/dashboard']);
        },1000)
      }
      console.log(x,'32');
    })
    // window.open("http://localhost:3000/auth/google/callback", "_blank");
    // window.location.href = 'http://localhost:3000/auth/google/callback';
  }
  loginUser(){
    
    // console.log(this.username,this.password,"value Check",JSON.stringify(d));
    this.authlog.fnLogUser(this.logForm.value).subscribe((x:any)=>{
      console.log(x);
      
      if(x.success){
        this.messageService.add({severity:'success', summary:'Verify User', detail:'Successfull Login',life:2000});    
        setTimeout(()=>{
          this.storage.setUserData(x);
          this.route.navigate(['/dashboard']);
        },1000)
      }
      // else{
      //   this.messageService.add({severity:'error', summary:'Verify User Failed', detail:"Can't Login with this credential",life:2000});    
      // }
    },(err)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:err.error.status,life:2000});    
      // console.log();
      
    })
  }

}
