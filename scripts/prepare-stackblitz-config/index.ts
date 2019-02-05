import { resolve } from "path";
import { readdirSync, statSync, readFileSync, copyFile } from "fs";
import { outputJSON } from 'fs-extra';

const CORE_DIR = resolve(__dirname, '../../core/dist');
const STACKBLITZ_ANGULAR_APP_DIR = resolve(__dirname, './stackblitz-angular-app/');
const DOCS_APP_STACKBLITZ_CONFIG_PATH = resolve(__dirname, '../../docs-app/src/stackblitz');

const angularConfig = {
  files: {},
  title: 'Angular wc app',
  description: 'Sample app',
  template: 'angular-cli',
  dependencies: {},
  settings: {
    compile: {
      trigger: 'auto',
      action: 'hmr',
      clearConsole: true
    }
  }
}

function copyComponentLibToStackblitz() {
  const filesObj = {};
  copyFilesToObject(CORE_DIR, filesObj, 'component-lib');
  return filesObj;
}

function copyFilesToObject(folderPath, obj, parentFolderPath) {
  readdirSync(folderPath).forEach((folderOrFile) => {
    const stackBlitzFilePath = `${parentFolderPath}${parentFolderPath ? '/' : ''}${folderOrFile}`;
    const pathToFolderOrFile = resolve(folderPath, folderOrFile);
    if (statSync(pathToFolderOrFile).isDirectory()) {
      copyFilesToObject(pathToFolderOrFile, obj, stackBlitzFilePath)
    } else {
      obj[stackBlitzFilePath] = readFileSync(pathToFolderOrFile).toString();
    }
  });
}

function copyAngularAppFiles() {
  const filesObj = {};
  copyFilesToObject(STACKBLITZ_ANGULAR_APP_DIR, filesObj, '');
  return filesObj;
}

function prepareAngularStackblitz() {
  const libFiles = copyComponentLibToStackblitz();
  const angularAppFiles = copyAngularAppFiles();
  const allFiles = {...libFiles, ...angularAppFiles};
  angularConfig.files = allFiles;
  console.log(Object.keys(allFiles));
}

prepareAngularStackblitz()

const outputPath = resolve(DOCS_APP_STACKBLITZ_CONFIG_PATH, 'angular.json');
outputJSON(outputPath, angularConfig);