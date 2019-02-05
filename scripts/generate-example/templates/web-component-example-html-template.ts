import { startCase } from 'lodash';

export const prepareWebComponentExampleHTMLFile = (prefix: string, componentName: string, exampleName: string) => (
`<!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title>${startCase(exampleName)} - ${startCase(componentName)}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <script src="../../../dist/stencil-component-lib.js"></script>
  </head>

  <body>
    <${prefix}-${componentName}></${prefix}-${componentName}>
  </body>
</html>`
);