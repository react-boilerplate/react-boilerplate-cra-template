import shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
const packageJson = require('../../package.json');

interface Options {}

process.chdir(path.join(__dirname, '../..'));

export function cleanAndSetup(opts: Options = {}) {
  if (!shell.test('-e', 'internals/startingTemplate')) {
    shell.echo('The example app has already deleted.');
    shell.exit(1);
  }
  shell.echo(chalk.blue('Cleaning the example app...'));

  shell.rm('-rf', 'public/*');
  shell.rm('-rf', 'src/*');

  shell.cp('-r', 'internals/startingTemplate/public/*', 'public');
  shell.cp('-r', 'internals/startingTemplate/src/*', 'src');
  shell.cp('internals/startingTemplate/tsconfig.json', 'tsconfig.json');

  shell.rm('-rf', 'internals/startingTemplate');
  shell.rm('-rf', 'internals/scripts');

  shell.exec('yarn run prettify -- src/*', { silent: true });

  modifyPackageJsonFile();

  shell.echo(
    chalk.green('Example app removed and setup completed. Happy Coding!!!'),
  );
}

function modifyPackageJsonFile() {
  delete packageJson['eslintConfig'];
  delete packageJson['dependencies']['replace-in-file'];
  delete packageJson['scripts']['cleanAndSetup'];

  packageJson['scripts']['prepare'] = 'husky install';

  fs.writeFileSync('./package.json', JSON.stringify(packageJson));
  shell.exec('yarn run prettify -- package.json', { silent: true });

  shell.exec('yarn install', { silent: false });
}

(function () {
  cleanAndSetup();
})();
