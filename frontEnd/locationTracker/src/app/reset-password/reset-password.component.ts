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
resetFlag : boolean;
responseKey : string ="result";
response : boolean;
emailCheck : string;
notRegistered : boolean =false;
constructor(private route: ActivatedRoute,
    private router: Router, private httpService:HttpCallsService,public snackBar: MdSnackBar,) { }

  ngOnInit() {
  }

checkExistingUser(){
//console.log('---CALLING---'+this.dupCheckFlag);
  this.httpService.checkUser(this.emailValue).subscribe (data =>{
   this.notRegistered=data[this.responseKey];
   if(this.notRegistered=false){
    // this.emailCheck=this.emailValue;
   }
  console.log('---TEST---'+this.notRegistered);
});

}
onSubmit(){
  this.response=true;
      this.httpService.resetPwd(this.emailValue).subscribe (data =>{
   this.resetFlag=data[this.responseKey];
       console.log('RESONSE---'+this.resetFlag);
               if(this.resetFlag=true){
                  this.router.navigate(['login']);

                      this.response=false;
                                            this.openSnackBar();
   
   }
});
}

  openSnackBar() {
    this.snackBar.open('RESET PASSWORD LINK HAS BEEN SENT TO YOUR EMAIL', 'close',{
      duration: 10000,
    });
  }
}
