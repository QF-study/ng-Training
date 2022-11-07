import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { wysliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-handle',
  template: ` <div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WySliderHandleComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset!: number;

  style:wysliderStyle = {};
  constructor() {}

  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges): void {
    //监听wyOffset发生变化
    if(changes['wyOffset']){
      this.style[this.wyVertical ? 'bottom' :'left'] = this.wyOffset + '%';

    }
  }

}
