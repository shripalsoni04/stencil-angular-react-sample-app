import { readdirSync, readFileSync, readFile, statSync } from 'fs-extra';
import { resolve } from 'path';
import { parse, HTMLElement } from 'node-html-parser';
import frontMatter from 'front-matter';
import markdownRenderer from './markdown-renderer';
import { UsageData, ExampleData } from './interfaces';
import { html } from 'js-beautify';

function renderMarkdown(markdown: string) {
  const { body, attributes } = frontMatter(markdown);
  return {
    ...attributes,
    body: markdownRenderer(body)
  };
}

function readMarkdown(path: string): string {
  return readFileSync(path, {
    encoding: 'utf8'
  });
}

function prepareExampleData(exampleFolderPath: string, folderName?: string): ExampleData {
  const example: ExampleData = new ExampleData();
  example.folderName = folderName;
  readdirSync(exampleFolderPath).forEach((file) => {
    const filePath = resolve(exampleFolderPath, file);
    if(file === 'index.html') {
      const fileContent = readFileSync(filePath).toString();
      const root = parse(fileContent, <any> { script: true}) as HTMLElement;
      const bodyContent = html(root.querySelector('body').innerHTML, {indent_size: 2});
      example.vanilla = {
        code: bodyContent
      };
    }

    if(file.toLowerCase() === 'readme.md') {
      const parsedMarkdown = renderMarkdown(readMarkdown(filePath));
      example.title = parsedMarkdown.title;
      example.sortOrder = parsedMarkdown.order;
      example.description = parsedMarkdown.body;
    }

    if(!example.title) {
      example.title = 'Example';
    }

    if(!example.description) {
      example.description = '';
    }
  });
  return example;
}

export function prepareVanillaUsageData(folderPath) {
  return readdirSync(folderPath).map((component) => {
    const compUsageData: UsageData =  new UsageData(component);
    const componentFolderPath = resolve(folderPath, component);
    
    if(statSync(componentFolderPath).isDirectory()) {
      const examples = [];
      const hasAnySubFolder = readdirSync(componentFolderPath).some((fileOrFolderName) =>  (
        statSync(resolve(componentFolderPath, fileOrFolderName)).isDirectory()
      ));
  
      if(hasAnySubFolder) { 
        readdirSync(componentFolderPath).forEach(exampleFolderName => {
          const exampleData = prepareExampleData(resolve(componentFolderPath, exampleFolderName), exampleFolderName);
          examples.push(exampleData);
        });
      } else {
        // If component folder do not contain, then trying to create example based on `index.html` and `readme.md` file in the folder.
        const exampleData = prepareExampleData(componentFolderPath);
        examples.push(exampleData);
      }
      compUsageData.examples = examples;
    }
    return compUsageData;
  });
};
