import shell from 'shelljs';
import { createNpmPackage, removeNpmPackage } from './create-npm-package';

interface Options {}

export function createCRA(opts: Options = {}) {
  const app_name = 'generated-cra-app';
  shell.exec(`rm -rf ${app_name}`);

  const template = createNpmPackage();
  shell.exec(`npx create-react-app ${app_name} --template file:${template}`, {
    silent: false,
    fatal: true,
  });

  removeNpmPackage();
}

createCRA();
