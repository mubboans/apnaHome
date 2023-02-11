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
   }

  ngOnInit(): void {
    const k=this.storage.isUserLogin()
    console.log(k);
    
  }
  loginUser(){
    
    // console.log(this.username,this.password,"value Check",JSON.stringify(d));
    this.authlog.fnLogUser(this.logForm.value).subscribe((x:any)=>{
      console.log(x);
      
      if(x.token){
       
      
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfull',life:2000});    
        setTimeout(()=>{
          const helper = new JwtHelperService();
          const decoded= helper.decodeToken(x.token);
          this.storage.setUserData(decoded);
          this.route.navigate(['/dashboard']);
        },2000)
        

        
      }
    })
  }

}
