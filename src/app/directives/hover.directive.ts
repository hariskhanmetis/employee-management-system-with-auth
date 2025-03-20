import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elr: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.elr.nativeElement.style.backgroundColor = '#e7e6e6';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elr.nativeElement.style.backgroundColor = '#f5f5f5';
  }
}
