import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IncreaseComponent } from './increase.component';
import { DecreaseComponent } from './decrease.component';
import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [
    AppComponent,
    IncreaseComponent,
    DecreaseComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
