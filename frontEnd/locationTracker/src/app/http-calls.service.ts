import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpCallsService {

  constructor(private http:Http) { }
login(user : any){

 const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://127.0.0.1:8081/login',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }



  getUser(mail){
    return this.http.get('http://127.0.0.1:8081/devices?email='+mail)
    .map((response: Response) =>response.json());
  }

  registerUser(user : any){
    const body= JSON.stringify(user);
    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://127.0.0.1:8081/registerUser',body,{
      headers:headers
    }).map((data : Response) => data.json());
  }
}
