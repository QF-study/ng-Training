import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneRoutingModule } from './one-routing.module';
import { FatherComponent } from './father/father.component';
import { SonComponent } from './son/son.component';
import { FormsModule } from '@angular/forms';
import { ThyEnterDirective } from './thy-enter.directive';


@NgModule({
  declarations: [
    FatherComponent,
    SonComponent,
    ThyEnterDirective
  ],
  imports: [
    CommonModule,
    OneRoutingModule,
    FormsModule
  ]
})
export class OneModule { }
