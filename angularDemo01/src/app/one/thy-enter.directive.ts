import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';

@Directive({
  selector: '[Enter]'
})
export class ThyEnterDirective {

  @Output() enter = new EventEmitter();

    constructor(private ngZone: NgZone, private elementRef: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        // 包裹代码将运行在Zone区域之外
        this.ngZone.runOutsideAngular(() => {
            this.elementRef.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
                const keyCode = event.which || event.keyCode;
                if (keyCode === 13) {
                    this.ngZone.run(() => {
                        this.enter.emit(event);
                    });
                }
            });
        });
    }

}
