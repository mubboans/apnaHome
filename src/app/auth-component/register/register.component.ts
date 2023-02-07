import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthlogService } from 'src/app/service/authlog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup;
  constructor(public fb:FormBuilder,public authlog:AuthlogService,public route:Router) {
    this.regForm=fb.group({
      username:fb.control('',Validators.required),
      password:fb.control('',Validators.required),
      confirmpassword:fb.control('',Validators.required),
      email:fb.control('',Validators.required),
      type:fb.control('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
regUser(){
  this.authlog.fnRegisterUser(this.regForm.value).subscribe((x:any)=>{
    console.log("Register");
    if(x.staus){
      this.route.navigate(['/login']);
    }
  })
}
}
