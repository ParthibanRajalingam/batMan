import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpCallsService {

  constructor(private http:Http) { }

  getUser(){
    return this.http.get('http://127.0.0.1:8081/1');
  }
}
