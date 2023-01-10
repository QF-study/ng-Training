import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from '../pages/pages.module';
import { ServicesModule } from '../services/services.module';
import { ShareModule } from '../share/share.module';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { AppStoreModule } from '../store';

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    ServicesModule,
    ShareModule,
    AppStoreModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  exports: [ShareModule, AppStoreModule, AppRoutingModule],
})
export class CoreModule {
  // @SkipSelf()：跳过自身去父module找
  //@Optional(): 没找到是会赋值为null  而不是报错
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被AppModule引入');
    }
  }
}
