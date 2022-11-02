import { NgModule } from '@angular/core';
import { WySliderModule } from '../wy-slider/wy-slider.module';
import { WyPlayerComponent } from './wy-player.component';



@NgModule({
  declarations: [
    WyPlayerComponent
  ],
  imports: [
    WySliderModule
  ],
  exports:[
    WyPlayerComponent
  ]
})
export class WyPlayerModule { }
