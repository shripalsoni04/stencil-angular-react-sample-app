import { addAngularComponent, resolveComponentPath, getComponentFileContent, updateComponentTemplateContent, getComponentRoutingModuleFileContent, writeComponentRoutingModuleFileContent } from '../utils/angular-utils';
import { writeFile } from 'fs-extra';
import toPascalCase from 'to-pascal-case';

export function generateAngularExample(webCompPrefix: string, componentName: string, exampleName: string) {
  addAngularComponent(exampleName, componentName);
  updateTemplateOfComponent(webCompPrefix, componentName, exampleName);
}

async function updateTemplateOfComponent(webCompPrefix: string, componentName: string, exampleName: string) {
  const componentFilePath = resolveComponentPath(exampleName, `${componentName}/${exampleName}`);
  let componentFileContent = getComponentFileContent(componentFilePath);
  const exampleTemplate = `template: \`
    <${webCompPrefix}-${componentName}></${webCompPrefix}-${componentName}>
  \``;
  componentFileContent = updateComponentTemplateContent(componentFileContent, `${exampleTemplate},`);
  await writeFile(componentFilePath, componentFileContent);
  configureComponentRouteInRoutingModule(exampleName, componentName, `${toPascalCase(exampleName)}Component`);
}

function configureComponentRouteInRoutingModule(exampleName: string, componentName: string, componentClassName: string) {
  // Add component import statement
  let routingModuleFileContent = getComponentRoutingModuleFileContent(componentName);
  routingModuleFileContent = routingModuleFileContent.replace(/\n*const\s*routes\s*:\s*Routes\s*=\s*\[/, `\nimport { ${componentClassName} } from './${exampleName}/${exampleName}.component';\n\nconst routes: Routes = [`);

  // Add route config to children array. First extract content of route config array.
  const matches = routingModuleFileContent.match(/children:\s*(\[(\n|.)*?\])/);
  let allRouteConfigs = matches[1];

  // Prepare new route config string. If it is the first route config, then not pre-pending comma.
  const routeConfigStr = `${allRouteConfigs === '[]' ? '' : ','}\n${' '.repeat(6)}{ path: '${exampleName}', component: ${componentClassName} }\n`;

  // Replace `]` with `newRouteConfig]`
  allRouteConfigs = allRouteConfigs.replace(/[\s|\n]*?\]/, `${routeConfigStr}${' '.repeat(4)}]`)

  // Replace whole children: [routeConfig] array with new data.
  const updatedChildRouteConfig = `children: ${allRouteConfigs}`;
  routingModuleFileContent = routingModuleFileContent.replace(/children:\s*(\[(\n|.)*?\])/, updatedChildRouteConfig);

  // Write updated file to disk
  writeComponentRoutingModuleFileContent(componentName, routingModuleFileContent);
}