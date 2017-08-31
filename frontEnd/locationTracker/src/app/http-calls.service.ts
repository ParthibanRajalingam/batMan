import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpCallsService {

  prodUrl : string='http://firstapp-alphamode.rhcloud.com/';
  devUrl :string='http://127.0.0.1:8080/';

  constructor(private http:Http) { }
login(user : any){

 const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.prodUrl+'login',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

checkLogin(user : any){

 const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.prodUrl+'checkLogin',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

getTrackingDetails(imei){
    return this.http.get(this.prodUrl+'trackingdetails?imei='+imei)
    .map((response: Response) =>response.json());
  }

  getUser(mail){
    return this.http.get(this.prodUrl+'devices?email='+mail)
    .map((response: Response) =>response.json());
  }
  checkUser(mail){
    return this.http.get(this.prodUrl+'checkUser?email='+mail)
    .map((response: Response) =>response.json());
  }


  registerUser(user : any){
    const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.prodUrl+'registerUser',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }

    resettingPwd(user : any){
    const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.prodUrl+'resettingPwd',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }
resetPwd(mail){
    return this.http.get(this.prodUrl+'resetPassword?email='+mail)
    .map((response: Response) =>response.json());
  }
}
