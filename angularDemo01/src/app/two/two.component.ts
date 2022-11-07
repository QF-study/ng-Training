import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

export type objType = {
  name?: string,
  age?: number
}

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoComponent implements OnInit {

  arr: Array<string | number> = ['a', 'b', 'c'];
  obj: objType = {
    name: 'xxx',
    age: 0
  }
  i:number = 0;
  j:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  clickMethod(){
    this.arr.push(this.arr.length);
    this.obj.age = ++this.i;
  }
  chlickFather(){
    ++this.j;
    console.log(this.j);
    
  }
}
