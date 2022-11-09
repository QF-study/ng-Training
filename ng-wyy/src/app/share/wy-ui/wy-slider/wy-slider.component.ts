import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, filter, fromEvent, map, merge, Observable, pluck, takeUntil, tap } from 'rxjs';
import { sliderEvent } from './wy-slider-helper';
import { SliderEventObserverConfig } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  //默认模式下(Emulated)，全局样式可以进来组件样式出不去,也就是说不会作用去其他组件
  // none: 表示组件样式就是全局样式了 可以作用于其他组件
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {
  @ViewChild('wySlider', { static: true }) private wySlider!: ElementRef;
  @Input() wyVertical = false;  //判断是否是水平方向

  private sliderDom!: HTMLDivElement;

  private dragStart$!: Observable<number>;
  private dragMove$!: Observable<number>;
  private dragEnd$!: Observable<Event>;

  constructor(@Inject(Document) private doc:Document) { }

  ngOnInit(): void {
    console.log('el:' + this.wySlider.nativeElement);
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
  }
  /**
   *  绑定事件
   *  PC：mousedown mousemove mouseup
   *  phone： touchstart touchmove touchend
   * @private
   * @memberof WySliderComponent
   */
  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX';
    //PC端
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: Event) => e instanceof MouseEvent,
      pluckkey: [orientField]
    };

    //手机端
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: Event) => e instanceof TouchEvent,
      pluckkey: ['touches', '0', orientField]
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, filter:filterFnc, pluckkey } = source;
      source.startPlucked$ = fromEvent(this.sliderDom, start)
        .pipe(
          filter(filterFnc),
          //tap 运算符：操作不会影响数据
          tap(sliderEvent),
          pluck(...pluckkey),
          map(res => res as number),
          map((position: number) => this.findClosestValue(position))
        );

      source.end$ = fromEvent(this.doc, end);

      source.moveResolved$ = fromEvent(this.doc, move)
        .pipe(
          filter(filterFnc),
          //tap 运算符：操作不会影响数据
          tap(sliderEvent),
          pluck(...pluckkey),
          map(res => res as number),
          distinctUntilChanged(), //检测发射的值是否遇上一个相同，  不同发射  相同跳过
          map((position: number) => this.findClosestValue(position)),
          takeUntil(source.end$)
        );
    })

    this.dragStart$ = merge<[number, number]>(mouse.startPlucked$ as Observable<number>, touch.startPlucked$  as Observable<number>);
    this.dragMove$ = merge<[number, number]>(mouse.moveResolved$  as Observable<number>, touch.moveResolved$  as Observable<number>);
    this.dragEnd$ = merge<[Event, Event]>(mouse.end$ as Observable<Event>, touch.end$ as Observable<Event>);

  }

}
