import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textfield-advanced',
  template: `
    <sh-textfield
      label="Name"
      placeholder="Enter Name"
      [value]="value"
      maxlength="10"
      is-required="true"
      [config]="config"
      [testArray]="testArray"
      (change)="onTextfieldValueChange($event)">
    </sh-textfield>
  `,
  styles: [
    `
    sh-textfield {
      --sh-textfield-border-color: red;
    }
    `
  ]
})
export class AdvancedComponent implements OnInit {

  public config = { size: 2 };

  public testArray = [1, 2, 3];

  public value = 'Shripal';

  constructor() { }

  ngOnInit() { }

  public onTextfieldValueChange(event) {
    console.log('event value is', event.detail);
    this.value = event.detail;
  }

}
