import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng-lts/api';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-checkuser',
  templateUrl: './checkuser.component.html',
  styleUrls: ['./checkuser.component.scss']
})
export class CheckuserComponent implements OnInit {

  constructor(private activeroute: ActivatedRoute,public sto:StorageService,public router:Router,private messageService: MessageService) {
    activeroute.queryParams.subscribe((x:any)=>{
      let data = JSON.parse(x.data)
      console.log(x,'query params from check users');
      let storageoj={
        accessToken:x.accessToken,
        error:x.error,
        data:data,
        refreshToken:x.refreshToken,
        success:x.success,
        profimg:x.profimg
      }
      if(x && x.success){
        sto.showLoader = true
        if(x.newUser) {
          this.messageService.add({severity:'success', summary:'Verify User', detail:'Successfull Login',life:2000});    
        } 
        else{
          this.messageService.add({severity:'success', summary:'Welcome back', detail:'Successfull Login',life:2000});    
        }
        setTimeout(()=>{
          this.sto.setUserData(storageoj);
          this.router.navigate(['/dashboard']);
          sto.showLoader =false
        },1000)
       
      }
    })
   }

  ngOnInit(): void {
  }

}
