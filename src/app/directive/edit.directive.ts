import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { EditService } from '../api/edit.service';

// https://stackblitz.com/edit/angular-content-editable-directive?file=src%2Fapp%2Fcontenteditable.directive.ts
@Directive({
  selector: '[appEdit]'
})
export class EditDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highLightColor: string = 'blue';
  @Input() allowEdit: boolean = true;
  @Input() value!: string;
  @Input() id!: string;
  @Input() update!: string | undefined;

  @Output() showEvent = new EventEmitter<string>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<EditUpdate> = new EventEmitter();
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private editService: EditService) {
  }

  @HostListener('keyup', ['$event']) onInputChange(event: Event) {
  }
  @HostListener("click", [('$event')]) onClick(event: Event) {
    //alert(this.id);
    if (this.allowEdit) {
      this.showEvent.emit(this.update);
      this.backgroundColor = this.defaultColor;
      this.makeEditable();
    }
  }

  @HostListener('keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.checkValues();
  }
  @HostListener('keydown.enter', ['$event']) onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.checkValues();
  }

  makeEditable() {
    this.renderer.addClass(this.el.nativeElement, "editing");
    this.renderer.setAttribute(this.el.nativeElement, "contentEditable", "true");
    this.el.nativeElement.focus();
  }

  setValue(value: string): string {
    this.el.nativeElement.innerText = value;
    this.value = value;
    return this.value;
  }

  checkValues() {
    const newValue = this.el.nativeElement.innerText;
    if (this.value !== newValue) {
      const edit: EditUpdate = {
        id: this.id,
        value: newValue
      }
      console.log('SP Call After Change: ', edit);
      this.edit(edit);
      this.onChange.emit(edit);
    }
    this.reset();
    return this.onChange;
  }
  edit(e: EditUpdate) {
    this.editService.edittext(e).then((data) => {
      console.log(data);
    });
  }

  reset() {
    this.renderer.removeClass(this.el.nativeElement, "editing");
    this.renderer.setAttribute(this.el.nativeElement, "contentEditable", "false");
    this.showEvent.emit(undefined);
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter(eventData: Event) {
    if (this.allowEdit) {
      this.backgroundColor = this.highLightColor;
    }
    else {
      this.backgroundColor = this.defaultColor;
    }
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}

export interface EditUpdate {
  id: string,
  value: string|boolean;
}

