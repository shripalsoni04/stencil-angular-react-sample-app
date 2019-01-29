/**
 * 
 * As react always set attributes for any native html element, there is no direct way to set properties on element.
 * This utility function attaches properties and eventHandlers to any native HTML element/custom element when set as `ref`
 * 
 * This function is a not a feature complete and so we are using web-component-wrapper-creator.js in this app.
 * We can use/extend this function in future when we need to have any special/custom behaviour which is not handled by
 * web-component-wrapper-creator.js
 * 
 * Sample Usage:
 *  
 * export default function Textfield(props) {
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
 *
 */
export function setWebComponentPropsAndEventHandlers(eventHandlers = {}, props = {}) {
  // Preserves element to remove event listener when ele is sent as null from react on change of ref.
  let storedEle;
  return (ele) => {
    // attach event handlers
    Object.keys(eventHandlers).forEach(eventName => {
      const eventHandler = eventHandlers[eventName];
      if (typeof eventHandler === 'function') {
        ele ? ele.addEventListener(eventName, eventHandler) : storedEle.removeEventListener(eventName, eventHandler);
      }
    })

    // set properties
    if (ele) {
      Object.keys(props).forEach(propName => {
        ele[propName] = props[propName]
      });
    }

    storedEle = ele;
  }
}