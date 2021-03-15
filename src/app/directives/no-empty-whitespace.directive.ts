import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoEmptyWhitespace]',
})
export class NoEmptyWhitespaceDirective {
  constructor(private readonly control: NgControl) {}
  @HostListener('keydown', ['$event']) onKeyUp(evt: KeyboardEvent) {
    const target = evt.target as HTMLInputElement;

    if (evt.code === 'Enter' && !!!target.value.trim()) {
      evt.preventDefault();
      this.control.control.patchValue('');
      return;
    }
  }
}
