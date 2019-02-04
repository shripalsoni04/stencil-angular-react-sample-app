import React from 'react';
import { Route } from "react-router-dom";
import { SimpleTextfield } from './simple/simple';
import { AdvancedTextfield } from './advanced/advanced';

export function Textfield({ match }) {
  return (
    <React.Fragment>
      <Route path={`${match.path}/simple`} component={SimpleTextfield} />
      <Route path={`${match.path}/advanced`} component={AdvancedTextfield} />
    </React.Fragment>
  );
}