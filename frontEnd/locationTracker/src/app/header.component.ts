import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
location='';
  constructor( public router: Router) {
  }
  onSignOut(){
     sessionStorage.removeItem('key');
     this.router.navigate(['login']);
  }
ngOnInit() {
}


}
