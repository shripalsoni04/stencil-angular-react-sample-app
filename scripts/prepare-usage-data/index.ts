import { prepareVanillaUsageData } from './vanilla-usage-data';
import { resolve } from 'path';
import { outputJSON } from 'fs-extra';
import { setAngularUsageData } from './angular-usage-data';
import { setReactUsageData } from './react-usage-data';

const previewAppPath = resolve(__dirname, '../../core/preview');
const angularAppComponentsPath = resolve(__dirname, '../../angular-app/src/app');
const reactAppComponentsPath = resolve(__dirname, '../../react-app/src/components');
const docsAppUsageDirPath = resolve(__dirname, '../../docs-app/src/usage');

const lstUsageData = prepareVanillaUsageData(previewAppPath);
setAngularUsageData(angularAppComponentsPath, lstUsageData);
setReactUsageData(reactAppComponentsPath, lstUsageData);

lstUsageData.forEach(usageData => {
  const outputPath = `${resolve(docsAppUsageDirPath, usageData.folderName)}.json`;
  outputJSON(outputPath, usageData.examples);
});
