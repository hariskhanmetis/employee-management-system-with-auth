import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostBinding('class.hovered') isHovered = false;
  constructor(private elr: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }
}
