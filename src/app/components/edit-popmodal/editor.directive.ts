import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input() highLightColor: string = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter(eventData: Event) {
    console.log(eventData);

    this.backgroundColor = this.highLightColor;
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
