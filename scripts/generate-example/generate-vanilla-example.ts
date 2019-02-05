import { outputFileSync, readdirSync, readdir, stat, pathExists } from 'fs-extra';
import { prepareWebComponentExampleHTMLFile } from './templates/web-component-example-html-template';
import { prepareWebComponentExampleReadmeFile } from './templates/web-component-example-readme-template';
import { resolve } from 'path';

export async function generateVanillaExample(prefix: string, componentName: string, exampleName: string) {
  const COMPONENT_PATH = resolve(__dirname, '../../core/preview', componentName);
  const isPreviewDirOfComponentExists = await pathExists(COMPONENT_PATH);
  let exampleOrder = 1;
  if (isPreviewDirOfComponentExists) {
    const lstFolders = await readdir(COMPONENT_PATH);
    exampleOrder = lstFolders.length + 1;
  }

  const htmlFileContent = prepareWebComponentExampleHTMLFile(prefix, componentName, exampleName);
  const readmeFileContent = prepareWebComponentExampleReadmeFile(exampleName, exampleOrder);
  const vanillaExampleHTMLFilePath = resolve(COMPONENT_PATH, `${exampleName}/index.html`);
  const vanillaExampleReadmeFilePath = resolve(COMPONENT_PATH, `${exampleName}/readme.md`);

  outputFileSync(vanillaExampleHTMLFilePath, htmlFileContent);
  outputFileSync(vanillaExampleReadmeFilePath, readmeFileContent);
}
