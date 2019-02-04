import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Textfield } from './components/textfield/textfield';

class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/textfield" component={Textfield} />
      </Router>
    )
  }
}

export default App;
