import { Component, OnInit } from '@angular/core';
import {HttpCallsService} from '.././http-calls.service';
import {MdSnackBar} from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
emailValue : string='';
resetFlag : string;
responseKey : string ="result";
response : boolean;
emailCheck : string;
registered : string ="true";
canSubmit: boolean=false;
constructor(private route: ActivatedRoute,
    private router: Router, private httpService:HttpCallsService,public snackBar: MdSnackBar,) { }

  ngOnInit() {
  }

checkExistingUser(){
//console.log('---CALLING---'+this.dupCheckFlag);
  this.httpService.checkUser(this.emailValue).subscribe (data =>{
   this.registered=data[this.responseKey];

   if(this.registered=="false"){
     this.emailCheck=this.emailValue;
     this.canSubmit=false;
     this.response=false;
     
          console.log('---new value---'+this.emailCheck);
   }
   else{
    this.sendMail();
     this.emailCheck='';
     this.canSubmit=true;
   }
     console.log('---TEST---'+this.registered);
});

}
onSubmit(){
    this.response=true;
  this.canSubmit =false;
  this.checkExistingUser();
}

sendMail(){
  if(this.registered=="true"){
  console.log(this.registered);
      this.httpService.resetPwd(this.emailValue).subscribe (data =>{
   this.resetFlag=data[this.responseKey];
       console.log('RESONSE---'+this.resetFlag);
               if(this.resetFlag=="true"){
                  this.router.navigate(['login']);
                      this.response=false;
                                            this.openSnackBar();
   
   }
});
}
else{
  this.response=false;
  this.canSubmit=true;
}
}

  openSnackBar() {
    this.snackBar.open('RESET PASSWORD LINK HAS BEEN SENT TO YOUR EMAIL', 'close',{
      duration: 5000,
    });
  }
}
