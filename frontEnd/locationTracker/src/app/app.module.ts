import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,MdCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DevicesComponent } from './devices.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,BrowserAnimationsModule,MdCardModule
  ],
   exports: [MdButtonModule, MdCheckboxModule,MdInputModule,MdToolbarModule,BrowserAnimationsModule,MdCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
