import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'py-script'
})
export class PyScriptDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const pyScriptContent = this.elementRef.nativeElement.innerHTML;
    console.log('Contenido de PyScript:', pyScriptContent);
  }
}

