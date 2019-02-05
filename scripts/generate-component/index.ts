import { createStencilComponent } from './create-stencil-component';
import { createAngularModuleAndBaseComponent } from './create-angular-module-and-component';

const componentName = process.argv[2];
console.log(process.argv);
const PREFIX = 'sh';
  
createStencilComponent(PREFIX, componentName);
createAngularModuleAndBaseComponent(componentName);