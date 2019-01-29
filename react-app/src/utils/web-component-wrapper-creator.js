/**
 * Code is copied from below two files of @ionic/react package.
 * https://github.com/ionic-team/ionic/blob/master/react/src/components/utils.ts
 * https://github.com/ionic-team/ionic/blob/master/react/src/components/createComponent.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';

function syncEvent(node, eventName, newEventHandler) {
  const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventNameLc];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}

function dashToPascalCase(str) {
  return str.toLowerCase().split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');
}

function attachEventProps(node, props) {
  Object.keys(props).forEach(name => {
    if (name === 'children' || name === 'style' || name === 'ref') {
      return;
    }

    if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
      syncEvent(node, name.substring(2), props[name]);
    } else {
      (node)[name] = props[name];
    }
  });
}

export function createReactComponent(tagName) {
  const displayName = dashToPascalCase(tagName);

  class ReactComponent extends React.Component {
    constructor(props) {
      super(props);
      this.componentRef = React.createRef();
    }

    static get displayName() {
      return displayName;
    }

    componentDidMount() {
      this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
      const node = ReactDOM.findDOMNode(this);

      if (!(node instanceof HTMLElement)) {
        return;
      }

      attachEventProps(node, props);
    }

    render() {
      const { children, forwardedRef, ...cProps } = this.props;

      return React.createElement(
        tagName,
        {
          ...cProps,
          ref: forwardedRef
        },
        children
      );
    }
  }

  function forwardRef(props, ref) {
    return <ReactComponent {...props} forwardedRef={ref} />;
  }
  forwardRef.displayName = displayName;

  return React.forwardRef(forwardRef);
}