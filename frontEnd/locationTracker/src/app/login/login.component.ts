import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
errorMessage='';
inMail='';
inPassword='';
inData :any =null;
jsonInData: any = null;
constructor(private router: Router) { }

onClick(){
  this.errorMessage='';
}

onSubmit(formData : NgForm){

this.inData=JSON.stringify(formData.value);
this.jsonInData=JSON.parse(this.inData);
this.inMail=this.jsonInData.email;
this.inPassword=this.jsonInData.password;
if((this.inMail=='parthiban.rajalingam@gmail.com') && (this.inPassword=='test')){
this.router.navigate(['home']);
}
else{
this.errorMessage="invalid attempt";
}

}

  ngOnInit() {
  }

}
