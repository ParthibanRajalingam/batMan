import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {HttpCallsService} from '.././http-calls.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
user={
  email:'',
  pwd:'',
  cpwd:'',
salt:''}
checkLogin={
  pwd:''
}
notSubmitted :  boolean=true;
response : boolean=false;
sub: any;
responseKey="result";
emailKey="email";
loginFlag:boolean;
resetFlag: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private httpService:HttpCallsService,public snackBar: MdSnackBar,) { }

  ngOnInit() {

       //Extracting query params
     this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params);
        this.checkLogin.pwd=params['q'];
      });
console.log('---CHCECK----'+this.checkLogin.pwd);
      this.httpService.checkLogin(this.checkLogin).subscribe (data =>{
   this.loginFlag=data[this.responseKey];
       console.log('RESONSE---'+this.loginFlag);
               if(this.loginFlag=true){
      this.user.email=data[this.emailKey];
   }
});
        if(this.loginFlag=false){
      this.router.navigate(['/notAuth']);
   }

  }


  onSubmit(){
    this.response=true;
    this.notSubmitted=false;
    this.httpService.resettingPwd(this.user).subscribe (data =>{
   this.resetFlag=data[this.responseKey];

   if(this.resetFlag=true){
     this.router.navigate(['login']);
     this.openSnackBar();
     this.response=false;
   }
else{
  this.notSubmitted=true;
}
   
  
});
  }

  openSnackBar() {
    this.snackBar.open('RESET PASSWORD SUCCESS', 'close',{
      duration: 3000,
    });
  }

}
