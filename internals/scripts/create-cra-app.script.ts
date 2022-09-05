import shell from 'shelljs';
import { createNpmPackage, removeNpmPackage } from './create-npm-package';

interface Options {}

export function createCRA(opts: Options = {}) {
  const app_name = 'generated-cra-app';
  shell.rm('-rf', app_name);

  const template = createNpmPackage();
  shell.exec(`yarn create react-app ${app_name} --template file:${template}`, {
    silent: false,
    fatal: true,
  });

  removeNpmPackage();
}

createCRA();
