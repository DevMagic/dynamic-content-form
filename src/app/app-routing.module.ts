import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicContentComponent } from './dynamic-content/dynamic-content.component';

const routes: Routes = [
  { path: '', component: DynamicContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
