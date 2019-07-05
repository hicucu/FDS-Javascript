import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { ButtonDirective } from './button.directive';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ButtonDirective
  ],
  imports: [
    BrowserModule
    , FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
