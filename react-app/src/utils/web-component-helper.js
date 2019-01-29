/**
 * 
 * As react always set attributes for any native html element, there is no direct way to set properties on element.
 * This utility function attaches properties and eventHandlers to any native HTML element/custom element when set as `ref`
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