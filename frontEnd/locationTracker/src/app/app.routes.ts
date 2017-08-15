import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component"
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { TrackingDetailsComponent } from "./tracking-details/tracking-details.component";

export const APP_ROUTES =[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'trackingDetails',component:TrackingDetailsComponent}
];

