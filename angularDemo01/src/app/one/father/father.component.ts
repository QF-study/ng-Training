import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.less'],

})
export class FatherComponent implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked, OnDestroy {

  num:number = 0;
  constructor() {
    console.log('constructor');
  }
  ngDoCheck(): void {
    console.log('Father DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Father ngOnChanges');
  }
  ngAfterContentInit(): void {
    console.log('Father ngAfterContentInit');
  }
  ngAfterViewInit(): void {
    console.log('Father ngAfterViewInit');
  }
  ngAfterContentChecked(): void {
    console.log('Father ngAfterContentChecked');
  }
  ngAfterViewChecked(): void {
    console.log('Father ngAfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('Father ngOnDestroy');
  }

  ngOnInit(): void {
    console.log('Father ngOnInit');
  }

  clickMethod(){
    this.num++;
  }

}
