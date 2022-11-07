import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneRoutingModule } from './one-routing.module';
import { FatherComponent } from './father/father.component';
import { SonComponent } from './son/son.component';


@NgModule({
  declarations: [
    FatherComponent,
    SonComponent
  ],
  imports: [
    CommonModule,
    OneRoutingModule
  ]
})
export class OneModule { }
