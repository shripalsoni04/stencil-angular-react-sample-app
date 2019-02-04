import React, { PureComponent } from 'react';
import { Textfield } from '../../../web-component-wrapper';

export class SimpleTextfield extends PureComponent {

  render() {
    return  <Textfield label="Name" placeholder="Enter Name"></Textfield>;
  }
}