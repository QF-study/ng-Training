import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  //angular默认的变更检测策略，当一个组件发生改变时，会将该组件树上父子组件同时检测一遍
  // OnPush策略：只有输入属性发生变更时才会触发变更检测
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  @Input() activeIndex = 0;
  @Output() changeSilde = new EventEmitter<'pre' | 'next'>();
  // static 设置这个dot是在变更检测前还是变更检测之后
  // 如果dot是一个动态的 此处应该为false 意为 在变更检测后计算模板查询时间
  @ViewChild('dot', { static: true }) dotRef!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSilde.emit(type);
  }
}
