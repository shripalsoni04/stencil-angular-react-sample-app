import { writeFileSync, readFileSync } from 'fs';
import { 
  addAngularComponent, resolveComponentPath, getComponentFileContent, updateComponentTemplateContent, 
  addAngularModuleWithRoutingModule, addModuleInImports, getComponentRoutingModuleFileContent, writeComponentRoutingModuleFileContent } from '../utils/angular-utils';
import { resolve } from 'path';
import toPascalCase from 'to-pascal-case';

export function createAngularModuleAndBaseComponent(componentName: string) {
  addAngularModuleWithRoutingModule(componentName);
  addAngularComponent(componentName);
  const componentFilePath = resolveComponentPath(componentName);
  let componentFileContent = getComponentFileContent(componentFilePath);
  componentFileContent = updateComponentTemplateContent(componentFileContent, 'template: \'<router-outlet></router-outlet>\',');
  writeFileSync(componentFilePath, componentFileContent);
  importComponentModuleToAppModule(componentName);
  addDefaultRouteToRoutingModuleOfComponent(componentName);
//   const source = ts.createSourceFile(modulePath, componentFileContent, ts.ScriptTarget.Latest, true);
//   console.log('source is', source);
}

function importComponentModuleToAppModule(componentName) {
  const appModuleFilePath = resolve(__dirname, '../../angular-app/src/app/app.module.ts');
  let fileContent = readFileSync(appModuleFilePath).toString();
  fileContent = addModuleInImports(fileContent, `${toPascalCase(componentName)}Module`, componentName);
  writeFileSync(appModuleFilePath, fileContent);
}

function addDefaultRouteToRoutingModuleOfComponent(componentName) {
  let routingModuleFileContent = getComponentRoutingModuleFileContent(componentName);
  const angularComponentName = `${toPascalCase(componentName)}Component`;
  const routesTpl = 
`import { ${angularComponentName} } from './${componentName}.component';

const routes: Routes = [
  {
    path: '${componentName}',
    component: ${angularComponentName},
    children: []
  }
];`;
  routingModuleFileContent = routingModuleFileContent.replace('const routes: Routes = [];', routesTpl);
  writeComponentRoutingModuleFileContent(componentName, routingModuleFileContent);
}
