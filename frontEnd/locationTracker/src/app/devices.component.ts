import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css','./app.component.css']
})
export class DevicesComponent implements OnInit {

devices= [{ "name":"Nokia", "lastOnline":"31/4/2017", "lastFound":"New York" },
{ "name":"Samsung", "lastOnline":"31/10/2017", "lastFound":"Coimbatore TN" },
{ "name":"vivo", "lastOnline":"9.10.2017", "lastFound":"India Chennai" },
{ "name":"MI", "lastOnline":"6.6.2017", "lastFound":"India Delhi" }];

  constructor() { }

  ngOnInit() {
  }

}
