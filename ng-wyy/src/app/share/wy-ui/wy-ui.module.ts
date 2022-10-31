import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';



@NgModule({
  declarations: [
    SingleSheetComponent
  ],
  imports: [
    // CommonModule
  ],
  exports:[SingleSheetComponent]
})
export class WyUiModule { }
