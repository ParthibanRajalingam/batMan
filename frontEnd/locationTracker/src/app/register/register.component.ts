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
  responseKey : string='result';
user={
  userName:'',
  email:'',
  pwd:'',
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
this.httpService.registerUser(this.user).subscribe (data =>{
   this.registrationFlag=data[this.responseKey];

   if(this.registrationFlag=="true"){
     this.router.navigate(['login']);
     this.openSnackBar();
   }
  
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
