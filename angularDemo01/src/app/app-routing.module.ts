import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [{ path: 'home', loadChildren: () => import('./two/two.module').then(m => m.TwoModule) }];
const routes: Routes = [{ path: '', loadChildren: () => import('./one/one.module').then(m => m.OneModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
