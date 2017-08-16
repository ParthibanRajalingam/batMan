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
errorMessage='';
user={
email : '',
pwd:''
}
inData :any =null;
jsonInData: any = null;
constructor(private router: Router,
private httpService: HttpCallsService 
) { }

onClick(){
  this.errorMessage='';
}

onSubmit(formData : NgForm){

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
this.errorMessage="invalid credentials";
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
