import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';
import shell from 'shelljs';
import { sliceGenerator } from './slice';
import * as path from 'path';
interface PrettifyCustomActionData {
  path: string;
}

export const baseGeneratorPath = path.join(__dirname, '../../src/app');

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('slice', sliceGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as PrettifyCustomActionData;
    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return '';
  });
}
