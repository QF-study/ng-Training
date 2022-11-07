import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class SonComponent implements OnInit {
  @Input() num!:number;
  obj = {
    num:12
  }
  constructor() {
    console.log('Son constructor');
  }

  ngDoCheck(): void {
    console.log('Son DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Son ngOnChanges');
  }
  ngAfterContentInit(): void {
    console.log('Son ngAfterContentInit');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    console.log(this.obj.num);
    this.num = this.obj.num
  }
  ngAfterViewChecked(): void {
    console.log('Son ngAfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('Son ngOnDestroy');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    setTimeout(() => {
    this.obj.num++;
    }, 2000);
  }
  sonClick(){
    this.obj.num++;
  }
}
