import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';


// 存放公共组件指令模块
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
  ],
  exports: [NzButtonModule,
    FormsModule,]
})
export class ShareModule { }
