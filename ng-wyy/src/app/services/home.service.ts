import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from './data-types/common.types';

@Injectable({
  providedIn: HomeService
})
export class HomeService {

  constructor() { }

  getBanners(): Observable<Banner[]>{

  }
}
