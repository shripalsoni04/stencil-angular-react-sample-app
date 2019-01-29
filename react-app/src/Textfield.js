import React from 'react';
import { setWebComponentPropsAndEventHandlers } from './utils/web-component-helper';

/**
 * A simple wrapper over sh-textfield web component. This wrapper sends everything as props to web-component and nothing as attribute,
 * because objects/arrays cannot be sent as attributes. So for consistency sending everything as properties of web-component.
 */
export default function Textfield(props) {
  const { onChange, ...rest } = props;
  return (
    <sh-textfield
      ref={setWebComponentPropsAndEventHandlers(
        {
          onChange
        },
        {
          ...rest
        }
      )} />
  );
}