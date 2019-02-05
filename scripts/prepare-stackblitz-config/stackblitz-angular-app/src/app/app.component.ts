import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    Hello {{ name }}
  `,
  styles: []
})
export class AppComponent  {
  name = 'Angular';
}
