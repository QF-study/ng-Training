import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneModule } from './one/one.module';
import { TwoModule } from './two/two.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OneModule,
    TwoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
