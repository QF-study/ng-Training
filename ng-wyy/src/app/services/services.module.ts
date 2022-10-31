import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { HomeService } from './home.service';

//生成一個令牌
export const API_CONFIG = new InjectionToken('ApiConfigToken');
// 存放服务
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [ {
    //將令牌作爲key
    provide:API_CONFIG, useValue: 'http://localhost:3000/'
  }]
})
export class ServicesModule { }
