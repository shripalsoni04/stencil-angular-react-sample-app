import { outputFileSync } from 'fs-extra';
import { prepareStencilComponentTemplate } from './templates/stencil-component';
import { resolve } from 'path';

export function createStencilComponent(prefix: string, componentName: string) {
  const COMPONENT_PATH = resolve(__dirname, '../../core/src/components');

  const componentFileContent = prepareStencilComponentTemplate(prefix, componentName);
  const newComponentFilePath = resolve(COMPONENT_PATH, `${componentName}/${componentName}.tsx`);
  const newComponentStylePath = resolve(COMPONENT_PATH, `${componentName}/${componentName}.css`);

  outputFileSync(newComponentFilePath, componentFileContent);
  outputFileSync(newComponentStylePath, '');
}

