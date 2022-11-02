import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  //默认模式下(Emulated)，全局样式可以进来组件样式出不去,也就是说不会作用去其他组件
  // none: 表示组件样式就是全局样式了 可以作用于其他组件
  encapsulation: ViewEncapsulation.None
})
export class WySliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
