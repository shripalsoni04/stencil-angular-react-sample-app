import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export function addAngularModuleWithRoutingModule(moduleName) {
  execSync(`cd angular-app && ng g module ${moduleName} --routing`);
}

export function addAngularComponent(componentName, componentPath?: string) {
  execSync(`cd angular-app && ng g component ${componentPath ? componentPath+'/'+componentName : componentName} --inlineStyle=true --inlineTemplate=true --skipTests=true`);
}

export function resolveComponentPath(componentName, componentPath?: string) {
  const modulePath = resolve(__dirname, '../../angular-app/src/app', componentPath || componentName);
  return resolve(modulePath, `${componentName}.component.ts`);
}

export function getComponentFileContent(componentFilePath) {
  return readFileSync(componentFilePath).toString();
}

export function updateComponentTemplateContent(componentFileData, newContent) {
  return componentFileData.replace(/template: `(\n|.)*`,/, newContent);
}

export function addModuleInImports(destModuleFileData: string, moduleNameToImport: string, componentName: string) {
  const matches = destModuleFileData.match(/imports:\s*(\[(\n|.)*?\])/);
  const lstModules = matches[1].split(',');
  lstModules.splice(1, 0, `\n${' '.repeat(4)}${moduleNameToImport}`);
  const updatedImportString = `imports: ${lstModules.toString()}`;
  destModuleFileData = destModuleFileData.replace(/imports:\s*(\[(\n|.)*?\])/, updatedImportString);

  // Add module import statement
  return destModuleFileData.replace(/@NgModule\({/, `import { ${moduleNameToImport} } from './${componentName}/${componentName}.module';\n\n@NgModule({`);
}

export function getComponentRoutingModulePath(componentName: string) {
  return resolve(__dirname, `../../angular-app/src/app/${componentName}/${componentName}-routing.module.ts`);
}

export function getComponentRoutingModuleFileContent(componentName: string) {
  const routingModulePath = getComponentRoutingModulePath(componentName);
  return readFileSync(routingModulePath).toString();
}

export function writeComponentRoutingModuleFileContent(componentName: string, fileContent: string) {
  const routingModulePath = getComponentRoutingModulePath(componentName);
  writeFileSync(routingModulePath, fileContent);
}
