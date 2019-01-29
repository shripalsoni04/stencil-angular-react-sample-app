import React, { Component } from 'react';
import { Textfield, HelloWorld } from './web-component-wrapper';

class App extends Component {

  // ref to sh-textfield web component for firstName. Using this ref, we can call any method of the web-component
  firstNameRef = React.createRef();

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
            ref={this.firstNameRef}
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

  componentDidMount() {
    console.log('firstName ref:', this.firstNameRef.current);
  }
}

export default App;
