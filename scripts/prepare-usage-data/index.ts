import { prepareVanillaUsageData } from './vanilla-usage-data';
import { resolve } from 'path';
import { outputJSON } from 'fs-extra';

const previewAppPath = resolve(__dirname, '../../core/preview');
const docsAppUsageDirPath = resolve(__dirname, '../../docs-app/src/usage');

const lstUsageData = prepareVanillaUsageData(previewAppPath);
// TODO: Add usageData of angular and react app by looping over usageData

lstUsageData.forEach(usageData => {
  const outputPath = `${resolve(docsAppUsageDirPath, usageData.folderName)}.json`;
  outputJSON(outputPath, usageData.examples);
});
