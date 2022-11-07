import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoRoutingModule } from './two-routing.module';
import { TwoComponent } from './two.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    TwoComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    TwoRoutingModule
  ]
})
export class TwoModule { }
