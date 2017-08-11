import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpCallsService {

  constructor(private http:Http) { }

  getUser(){
    return this.http.get('http://127.0.0.1:8081/listUsers')
    .map((response: Response) =>response.json());
  }
}
