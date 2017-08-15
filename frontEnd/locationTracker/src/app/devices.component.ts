import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import {HttpCallsService} from './http-calls.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css','./app.component.css'],
  providers:[HttpCallsService]
})
export class DevicesComponent implements OnInit {
devices : any ;
deviceDetails :any;
deviceDetailsKey='device_details';
deviceNameKey='device_name';
device_name ='TEST';
i : number=0;
constructor(private httpService:HttpCallsService,
  private router: Router) { }
 key = sessionStorage.getItem('key') ;
  ngOnInit() {
    if(this.key== "true"){
    this.httpService.getUser().subscribe(
    (data: any) => {
      const deviceDetailStore=[];
      for(this.i=0; this.i<data.length;this.i++){
        deviceDetailStore.push(data[this.i][this.deviceDetailsKey][0]);
        console.log(data);
        console.log(this.i+'----'+data[this.i][this.deviceDetailsKey][0]);
      }
      console.log(data[0][this.deviceDetailsKey]);
      this.deviceDetails=deviceDetailStore;
      console.log('&&&'+this.deviceDetails);
    }
    );
  }
  else{
    this.router.navigate(['login']);
  }


  }

}
