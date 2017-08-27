import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpCallsService {

  prodUrl : string='http://firstapp-alphamode.rhcloud.com';
  devUrl :string='http://127.0.0.1:8081/';

  constructor(private http:Http) { }
login(user : any){

 const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.devUrl+'login',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

checkLogin(user : any){

 const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.devUrl+'checkLogin',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

getTrackingDetails(imei){
    return this.http.get(this.devUrl+'trackingdetails?imei='+imei)
    .map((response: Response) =>response.json());
  }

  getUser(mail){
    return this.http.get(this.devUrl+'devices?email='+mail)
    .map((response: Response) =>response.json());
  }
  checkUser(mail){
    return this.http.get(this.devUrl+'checkUser?email='+mail)
    .map((response: Response) =>response.json());
  }


  registerUser(user : any){
    const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.devUrl+'registerUser',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

    resettingPwd(user : any){
    const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.devUrl+'resettingPwd',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }
resetPwd(mail){
    return this.http.get(this.devUrl+'resetPassword?email='+mail)
    .map((response: Response) =>response.json());
  }
}
