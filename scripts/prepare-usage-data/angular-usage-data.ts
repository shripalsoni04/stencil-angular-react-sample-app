import { readdirSync, readFileSync, readFile, statSync } from 'fs-extra';
import { resolve } from 'path';
import { UsageData, ExampleData } from './interfaces';
import { js } from 'js-beautify';

function setAngularUsageInExampleData(exampleFolderPath: string, exampleData: ExampleData): void {
  if (!exampleData) {
    return;
  }
  readdirSync(exampleFolderPath).forEach((file) => {
    const filePath = resolve(exampleFolderPath, file);
    if(file.endsWith('.component.ts')) {
      const fileContent = readFileSync(filePath).toString();
      const bodyContent = js(fileContent);
      exampleData.angular = {
        code: bodyContent
      };
    }
  });
}

/**
 * 
 * @param folderPath Path to folder which contains list of components
 * @param lstUsageData List of UsageData prepared from preview app.
 */
export function setAngularUsageData(folderPath, lstUsageData: UsageData[] = []) {
  readdirSync(folderPath).forEach((component) => {
    const compUsageData = lstUsageData.find(usageData => usageData.folderName === component);
    const componentFolderPath = resolve(folderPath, component);
    
    if(statSync(componentFolderPath).isDirectory()) {
      readdirSync(componentFolderPath).forEach(exampleFolderName => {
        if(statSync(resolve(componentFolderPath, exampleFolderName)).isDirectory()) {
          const exampleData = ((compUsageData && compUsageData.examples) || []).find(example => example.folderName === exampleFolderName) 
          setAngularUsageInExampleData(resolve(componentFolderPath, exampleFolderName), exampleData);
        }
      });
    }
  });
};
