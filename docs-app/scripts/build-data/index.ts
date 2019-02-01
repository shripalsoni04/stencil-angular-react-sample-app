import Listr from 'listr';
import buildApiReference from './api-reference';
// import buildSearchIndex from './search-index';

const tasks = new Listr([
  buildApiReference
  // buildSearchIndex // TODO: Enable later
]);

export default tasks;

if (!module.parent) {
  tasks.run().catch(console.error);
}
