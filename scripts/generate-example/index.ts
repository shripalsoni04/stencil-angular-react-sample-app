import { generateVanillaExample } from "./generate-vanilla-example";
import { generateAngularExample } from "./generate-angular-example";

const componentName = process.argv[2];
const exampleName = process.argv[3];
const PREFIX = 'sh';

generateVanillaExample(PREFIX, componentName, exampleName);
generateAngularExample(PREFIX, componentName, exampleName);
