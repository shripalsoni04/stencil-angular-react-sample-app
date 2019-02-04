import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleComponent } from './simple/simple.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { TextfieldComponent } from './textfield.component';

const routes: Routes = [
  {
    path: 'textfield',
    component: TextfieldComponent,
    children: [
      { path: 'simple', component: SimpleComponent },
      { path: 'advanced', component: AdvancedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextfieldRoutingModule { }
