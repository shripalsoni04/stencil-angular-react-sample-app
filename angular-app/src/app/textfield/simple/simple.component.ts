import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textfield-simple',
  template: `
    <sh-textfield label="Name" placeholder="Enter Name"></sh-textfield>
  `,
  styles: []
})
export class SimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
