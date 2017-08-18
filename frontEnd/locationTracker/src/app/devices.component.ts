import { Component, OnInit,Output,EventEmitter } from '@angular/core';
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
i : number=0;
noDevice : boolean=false;

constructor(
  private httpService:HttpCallsService,
  private router: Router) { }

 key = sessionStorage.getItem('key') ;
  ngOnInit() {
    if(this.key== "true"){
    this.httpService.getUser(sessionStorage.getItem('email')).subscribe(
    (data: any) => {
      const deviceDetailStore=[];
      if(data.length != 0){
      for(this.i=0; this.i<data.length;this.i++){
        deviceDetailStore.push(data[this.i][this.deviceDetailsKey][0]);
        console.log(data);
        console.log(this.i+'----'+data[this.i][this.deviceDetailsKey][0]);
      }
      console.log(data[0][this.deviceDetailsKey]);
      this.deviceDetails=deviceDetailStore;
      console.log('&&&'+this.deviceDetails);
    }
      else{
    console.log('no data found');
    this.noDevice=true;
  }
  }

    );
  }
  else{
    this.router.navigate(['login']);
  }


}

seeOnMap(lat,long){
 window.open('http://www.google.com/maps/place/'+lat+','+long+'/@'+lat+','+long+',10z',
  '_blank');
  window.focus();
}

onMoreDetails(imei : string){
console.log('Device IMEI'+imei);
    this.router.navigate(['home/trackingDetails'], { queryParams: { selectedDevice: imei } });
}

}

