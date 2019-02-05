import toPascalCase from 'to-pascal-case';

export const prepareStencilComponentTemplate = (prefix, componentName) => (
`import { Component } from '@stencil/core';

@Component({
  tag: '${prefix}-${componentName}',
  styleUrl: '${componentName}.css',
  shadow: true
})
export class ${toPascalCase(componentName)} {

}
`
);

