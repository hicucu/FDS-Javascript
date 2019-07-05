import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { returnType } from './return.type';

@Component({
  selector: 'app-popup',
  template: `  
  <div class="popup">    
      <h1>JavaScript Popup</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      <button class="btn-close" (click)="closePopup()">X</button>
      <input type="text" [(ngModel)]="inputText">
      <button class="btn-ok" (click)="validationValue()" appButton>OK</button>
      <button class="btn-cancel" (click)="closePopup()" appButton>Cancel</button>    
  </div>  
  <div class="overlay"></div>
  `,
  styles: [
    `
    .popup {
      transform: translateX(-50%);
      position: absolute;
      left: 50%;
      display: block;
      margin: 20px auto;
      top: 0;
      background: white;
      padding: 10px;
      box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    .btn-close {
      position: absolute;
      right: 0;
      top: 0;      
      height: 30px;
      font-size: 1.1rem;      
      background: transparent;
      border: 0;
    }    
    .overlay {      
      position:absolute;;
      width: 100vw;
      height: 100vh; 
      background: rgba(0,0,0,0.5);
      top: 0;
      left: 0;      
    }
    `
  ]
})

export class PopupComponent implements OnInit {

  constructor() { }
  inputText: string;

  @Output() returnValue = new EventEmitter();

  ngOnInit() {
    this.inputText = "";
  }

  validationValue() {
    if (this.inputText && this.inputText.trim())
      this.closePopup(`from popup : ${this.inputText}`);
  }
  closePopup(value: returnType) {

    this.returnValue.emit(value);

  }
}
