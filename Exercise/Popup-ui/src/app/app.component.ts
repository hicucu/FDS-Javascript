import { Component } from '@angular/core';
import { returnType } from './popup/return.type';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <h1>JavaScript Popup</h1>      
    <app-popup *ngIf="isPopup" (returnValue)="printValue($event)"></app-popup>    
    
    <button class="toggle-popup" (click)="togglePopup()" appButton>show popup</button>  
    <p class="popup-message">{{displayValue}}</p>
    
  `,
  styles: []
})
export class AppComponent {
  isPopup = false;
  displayValue: returnType = "";
  togglePopup() {
    this.isPopup = true;
  }
  printValue(value: returnType) {
    if (value)
      this.displayValue = value;
    this.isPopup = false;
  }
}
