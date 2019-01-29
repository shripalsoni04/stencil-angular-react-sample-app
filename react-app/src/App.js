import React, { Component } from 'react';
import { Textfield, HelloWorld } from './web-component-wrapper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Shripal',
      lastName: 'Soni'
    };
  }

  handleFirstNameChange = (event) => {
    this.setState({
      firstName: event.detail
    })
  }

  handleLastNameChange = (event) => {
    this.setState({
      lastName: event.detail
    })
  }

  render() {
    const { firstName, lastName } = this.state;

    return (
      <div className="web-components-container">
        <h1>React Stencil Web Component</h1>
        <div className="comp">
          <h2>Hello World Component</h2>
          <HelloWorld
            first={firstName} 
            last={lastName}>
          </HelloWorld>
        </div>
        <div className="comp">
          <h2>Textfield Component</h2>
          <Textfield
            config={{a: '1', b: '2'}}
            testArray={[1,2,3]}
            label="First Name"
            placeholder="Enter First Name"
            value={firstName}
            isRequired={false}
            maxlength="20"
            onChange={this.handleFirstNameChange} />
          <Textfield
            label="Last Name"
            placeholder="Enter Last Name"
            value={lastName}
            isRequired={true}
            maxlength="20"
            onChange={this.handleLastNameChange} />
        </div>
      </div>
    );
  }
}

export default App;
