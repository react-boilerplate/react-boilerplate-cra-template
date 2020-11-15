import shell from 'shelljs';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

interface Options {}

export function crateTemplateFolder(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  const copyToTemplate = (path: string, isRecursive?: boolean) => {
    if (isRecursive) {
      shell.cp('-r', path, `template/${path}`);
    } else {
      shell.cp(path, `template/${path}`);
    }
  };

  // Clean already generated one
  shell.rm('-rf', 'template');

  shell.mkdir('template');

  shell.mkdir('template/internals');
  copyToTemplate('internals/generators', true);

  shell.mkdir('template/internals/extractMessages');
  copyToTemplate('internals/extractMessages/i18next-scanner.config.js');
  copyToTemplate('internals/extractMessages/stringfyTranslations.js');

  shell.mkdir('template/internals/scripts');
  copyToTemplate('internals/scripts/clean.ts');

  copyToTemplate('internals/startingTemplate', true);
  copyToTemplate('internals/testing', true);

  copyToTemplate('internals/ts-node.tsconfig.json');

  copyToTemplate('.vscode', true);
  copyToTemplate('public', true);
  copyToTemplate('src', true);
  copyToTemplate('.babel-plugin-macrosrc.js');
  copyToTemplate('.env.local');
  copyToTemplate('.env.production');
  copyToTemplate('.eslintrc.js');
  copyToTemplate('.gitattributes');
  copyToTemplate('.gitignore');
  copyToTemplate('.npmrc');
  copyToTemplate('.nvmrc');
  copyToTemplate('.prettierignore');
  copyToTemplate('.prettierrc');
  copyToTemplate('.stylelintrc');
  copyToTemplate('tsconfig.json');
  copyToTemplate('README.md');

  // Rename some specific files so they won't be discarded in 'yarn pack'
  shell.mv('template/.gitignore', 'template/gitignore');
  shell.mv('template/.npmrc', 'template/npmrc');

  if (abortOnFailEnabled) shellDisableAbortOnFail();
}

export function removeTemplateFolder() {
  shell.rm('-rf', 'template');
}
