import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textfield-advanced',
  template: `
    <sh-textfield
      label="Name"
      placeholder="Enter Name"
      value="Shripal"
      maxlength="10"
      [isRequired]="true"
      [config]="{ size: 2}"
      [testArray]="[1, 2, 3]"
      (change)="handleTextfieldValueChange($event)">
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

  constructor() { }

  ngOnInit() { }

  public handleTextfieldValueChange(event) {
    console.log('textfield value is', event.detail);
  }

}
