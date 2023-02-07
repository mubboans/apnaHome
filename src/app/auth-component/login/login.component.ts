import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthlogService } from 'src/app/service/authlog.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // username:string;
  // password:string;
  logForm:FormGroup;
  constructor(public storage:StorageService,public authlog:AuthlogService,public fb:FormBuilder,public route:Router) {
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
        this.storage.setUserData(x.token);
        this.route.navigate(['/dashboard']);
      }
    })
  }

}
