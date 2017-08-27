import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '.././http-calls.service';
import {MdSnackBar} from '@angular/material';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[HttpCallsService]
})
export class RegisterComponent implements OnInit {
  passwordMismatch='';
  sysdate= Date.now();
  errorMessage='';
  registrationFlag: any;
  dupCheckFlag : any;
  responseKey : string='result';
  response : boolean=false;
user={
  userName:'',
  email:'',
  emailCheck:'',
  pwd:'',
  cpwd:'',
  user_created_date: this.sysdate,
salt:'',
active:'Y',
user_updated_date:'',
user_activated_date:'',
user_last_logged_in_date:'',
premium_member:'N',
premium_package_type:'',
premium_start_date:'',
premium_end_date:''
};

  constructor(private httpService: HttpCallsService ,
  public snackBar: MdSnackBar,
  private router: Router
  ) { }

  onSubmit(){
    this.response=true;
this.httpService.registerUser(this.user).subscribe (data =>{
   this.registrationFlag=data[this.responseKey];

   if(this.registrationFlag=="true"){
     this.router.navigate(['login']);
     this.openSnackBar();
     this.response=false;
   }
  
});
}

checkExistingUser(){
//console.log('---CALLING---'+this.dupCheckFlag);
  this.httpService.checkUser(this.user.email).subscribe (data =>{
   this.dupCheckFlag=data[this.responseKey];
   if(this.dupCheckFlag=="true"){
     this.user.emailCheck=this.user.email;
   }
   
 // console.log('---TEST---'+this.dupCheckFlag);
});

}
openSnackBar() {
    this.snackBar.open('REGISTRATION SUCCESS', 'close',{
      duration: 3000,
    });
  }

  ngOnInit() {
  }

}
