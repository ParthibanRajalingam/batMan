import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import {HttpCallsService} from './http-calls.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css','./app.component.css'],
  providers:[HttpCallsService]
})
export class DevicesComponent implements OnInit {

devices : any [];

  constructor(private httpService:HttpCallsService) { }
 
  ngOnInit() {
    this.httpService.getUser().subscribe(
    (data: any) => this.devices=data
    );

  }

}
