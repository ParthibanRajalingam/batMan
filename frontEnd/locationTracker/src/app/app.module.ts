import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms'; 
import {MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,MdCardModule,MdSnackBarModule,
  MdIconModule,MdProgressBarModule,MdTooltipModule,
  MdMenuModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DevicesComponent } from './devices.component';
import {HttpCallsService} from './http-calls.service';
import { LoginComponent } from './login/login.component';
import {  APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TrackingDetailsComponent } from './tracking-details/tracking-details.component';
import { CustomFormsModule } from 'ng2-validation';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DevicesComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TrackingDetailsComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    NotAuthorisedComponent
  ],
  imports: [
     RouterModule.forRoot(
      APP_ROUTES
      ,{ useHash: true }
      //{ enableTracing: true } // <-- debugging purposes only
    ),
        CustomFormsModule,
    BrowserModule,FormsModule,MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,MdTooltipModule,
    BrowserAnimationsModule,MdCardModule,HttpModule,MdSnackBarModule,MdMenuModule,MdProgressBarModule,MdIconModule
  ],
   exports: [MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,
   BrowserAnimationsModule,MdCardModule],
  providers: [HttpCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
