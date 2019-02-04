import React, { PureComponent } from 'react';
import { Textfield } from '../../../web-component-wrapper';

export class AdvancedTextfield extends PureComponent {

  handleTextfieldValueChange = (event) => {
    console.log('textfield value is', event.detail);
  };

  render() {
    return  (
        <Textfield 
          label="Name" 
          placeholder="Enter Name"
          value="Shripal"
          maxlength="10"
          isRequired={true}
          config={ { size: 2 } }
          testArray={ [1, 2, 3] }
          onChange={this.handleTextfieldValueChange}>
      </Textfield>
    );
  }
}