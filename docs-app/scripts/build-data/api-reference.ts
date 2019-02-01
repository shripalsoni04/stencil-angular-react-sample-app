import { components } from 'docs/core.json';
import { resolve } from 'path';
import { outputJson } from 'fs-extra';

const OUTPUT_PATH = resolve(
  __dirname,
  '../../src/components/page/data/api-reference.json'
);

const reference = components.map(component => [
  component.tag,
  `/docs/api/${component.tag.slice(3)}`
]);

export default {
  title: 'Build API reference data',
  task: () => outputJson(OUTPUT_PATH, reference, { spaces: 2 })
};
