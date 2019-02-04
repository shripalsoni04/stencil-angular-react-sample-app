import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextfieldRoutingModule } from './textfield-routing.module';
import { SimpleComponent } from './simple/simple.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { TextfieldComponent } from './textfield.component';

@NgModule({
  declarations: [SimpleComponent, AdvancedComponent, TextfieldComponent],
  imports: [
    CommonModule,
    TextfieldRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TextfieldModule { }
