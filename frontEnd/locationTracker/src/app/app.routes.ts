import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component"
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SetNewPasswordComponent } from "./set-new-password/set-new-password.component";
import { TrackingDetailsComponent } from "./tracking-details/tracking-details.component";
import { NotAuthorisedComponent } from "./not-authorised/not-authorised.component";

export const APP_ROUTES =[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'home/trackingDetails',component:TrackingDetailsComponent},
    {path:'resetPassword',component:ResetPasswordComponent},
    {path:'setNewPassword',component:SetNewPasswordComponent},
    {path:'notAuth',component:NotAuthorisedComponent}
];

