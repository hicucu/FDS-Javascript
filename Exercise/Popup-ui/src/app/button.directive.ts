import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  constructor(el: ElementRef, renderer: Renderer2) {

    renderer.setStyle(el.nativeElement, 'background', 'white');
    renderer.setStyle(el.nativeElement, 'border-radius', '5px');
    renderer.setStyle(el.nativeElement, 'border', '1px solid #dcdcdc');
    renderer.setStyle(el.nativeElement, 'height', '20px');
    renderer.setStyle(el.nativeElement, 'margin', '0 0 0 2px');
  }

}
