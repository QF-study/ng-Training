import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { objType } from '../two.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  
})
export class UserComponent implements OnInit, OnChanges, DoCheck {

  @Input('sex') sex!: Array<string | number>;
  @Input('videos') videos!: objType;
  constructor() { }
  ngDoCheck(): void {
    console.log(this.videos);
  }

  ngOnChanges({sex, videos}: SimpleChanges): void {
    console.log(sex);
    console.log(videos);
    
  }

  ngOnInit(): void {
    console.log(this.videos);
  }
}
