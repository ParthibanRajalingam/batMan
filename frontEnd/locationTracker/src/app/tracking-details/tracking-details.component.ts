import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {HttpCallsService} from '.././http-calls.service';
@Component({
  selector: 'app-tracking-details',
  templateUrl: './tracking-details.component.html',
  styleUrls: ['./tracking-details.component.css']
})
export class TrackingDetailsComponent implements OnInit {
sub: any;
page: any;
key : any;
i : number;
tracking_details_key="tracking_details";
tracking_details:any;
noTrackingDetails: boolean;
  constructor(  private route: ActivatedRoute,
    private router: Router, private httpService:HttpCallsService) { }

  ngOnInit() {
    //Extracting query params
     this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params);
        this.page=params['selectedDevice'];
      });

    this.key  = sessionStorage.getItem('key') ;
      if(this.key== "true"){
        console.log('Sendig req for'+this.page);
    this.httpService.getTrackingDetails(this.page).subscribe(
    (data: any) => {
      const trackingDetailStore=[];
      if(data.length != 0){
      for(this.i=0; this.i<data.length;this.i++){
        trackingDetailStore.push(data[this.i][this.tracking_details_key][0]);
        console.log(data);
        console.log(this.i+'----'+data[this.i][this.tracking_details_key][0]);
      }
      console.log(data[0][this.tracking_details_key]);
      this.tracking_details=trackingDetailStore;
      console.log('&&&'+this.tracking_details);
    }
      else{
    console.log('no data found');
    this.noTrackingDetails=true;
  }
  }

    );
  }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
