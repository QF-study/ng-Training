import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, filter, fromEvent, map, merge, Observable, pluck, takeUntil, tap } from 'rxjs';
import { isArray } from 'src/app/utils/array';
import { getPercent, limitNumberInRange } from 'src/app/utils/number';
import { getElementOffset, sliderEvent } from './wy-slider-helper';
import { SliderEventObserverConfig, SliderValue } from './wy-slider-type';

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
  @Input() wyMin = 0;
  @Input() wyMax = 100;

  private isDragging: boolean = false;
  Value: SliderValue = null;
  offset: SliderValue = null;
  private sliderDom!: HTMLDivElement;

  private dragStart$!: Observable<number>;
  private dragMove$!: Observable<number>;
  private dragEnd$!: Observable<Event>;

  constructor(@Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('el:' + this.wySlider.nativeElement);
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
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
      const { start, move, end, filter: filterFnc, pluckkey } = source;
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

    this.dragStart$ = merge<[number, number]>(mouse.startPlucked$ as Observable<number>, touch.startPlucked$ as Observable<number>);
    this.dragMove$ = merge<[number, number]>(mouse.moveResolved$ as Observable<number>, touch.moveResolved$ as Observable<number>);
    this.dragEnd$ = merge<[Event, Event]>(mouse.end$ as Observable<Event>, touch.end$ as Observable<Event>);
    let a = new Date();
    a.getMinutes
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (isArray(events, 'start') && this.dragStart$) {
      this.dragStart$.subscribe(this.onDragStart.bind(this));
    }

    if (isArray(events, 'move') && this.dragMove$) {
      this.dragMove$.subscribe(this.onDragMove.bind(this));
    }

    if (isArray(events, 'end') && this.dragEnd$) {
      this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value);

  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      // 手动变更检测
      this.cdr.markForCheck();
    }
  }

  private onDragEnd() {
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }

  private setValue(value: SliderValue) {
    this.Value = value;
    this.updateTrackAndHandles(value);
  }

  private updateTrackAndHandles(value: SliderValue) {
    this.offset = this.getValueToOffset(value);
  }

  private getValueToOffset(value: SliderValue): SliderValue {
    return getPercent(this.wyMin, this.wyMax, value as number);
  }

  private toggleDragMoving(movable: boolean) {
    // 為true表示正在移動
    if (movable) {
      // 綁定
      this.isDragging = true;
      this.subscribeDrag(['move', 'end']);
    } else {
      // 解綁
      //this.unsubscribeDrag(['move', 'end']);
    }
  }

  private findClosestValue(position: number): number {
    //获取滑块总长
    const sliderLength = this.getSliderLength();

    // 获取滑块(左、上)端点位置
    const sliderStart = this.getSliderStartPosition();

    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.wyVertical ? 1 - ratio : ratio;
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left;
  }
}
