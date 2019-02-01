import Listr from 'listr';
import buildPages from '../build-pages';
import buildData from '../build-data';

const tasks = new Listr({ collapse: false });

tasks.add({
  title: 'Pages',
  task: () => buildPages
});

tasks.add({
  title: 'Data',
  task: () => buildData
});

tasks.run().catch(console.error);
