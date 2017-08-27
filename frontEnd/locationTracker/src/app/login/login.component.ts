import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import {HttpCallsService} from '.././http-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFlag :any;
  responseKey='result';
  response : boolean=false;
  notSubmitted: boolean=true;
errorMessage:boolean=false;
user={
email : '',
pwd:''
}
inData :any =null;
jsonInData: any = null;
constructor(public router: Router,
private httpService: HttpCallsService 
) { }

onClick(){
  this.errorMessage=false;
}

onSubmit(formData : NgForm){
this.response=true;
this.notSubmitted=false;
this.httpService.login(this.user).subscribe (data =>{
   this.loginFlag=data[this.responseKey];
//console.log('------------'+this.loginFlag);
// Save data to sessionStorage
sessionStorage.setItem('key', 'true');
sessionStorage.setItem('email',this.user.email);
   if(this.loginFlag=="true"){
     this.router.navigate(['/home']);
   }
   else{
     this.notSubmitted=true;
this.errorMessage=true;
this.response=false;
   }
  
});

}

  ngOnInit() {
    //Detect the client mobile or desktop
     var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
       console.log('a.mobile-other');//all mobile except chrome

    else if(/Chrome/i.test(ua))
       console.log('a.chrome');//desktop -chrome
     

    else
       console.log('a.desktop-other');//other browser desktop
  }

}
