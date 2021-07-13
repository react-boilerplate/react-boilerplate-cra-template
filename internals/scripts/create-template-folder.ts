import shell from 'shelljs';
import replace from 'replace-in-file';

import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

interface Options {}

export function crateTemplateFolder(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  const copyToTemplate = (
    path: string,
    isRecursive?: boolean,
    modifyContent?: {
      from: RegExp;
      to: string;
    },
  ) => {
    const p = `template/${path}`;
    if (isRecursive) {
      shell.cp('-r', path, p);
    } else {
      shell.cp(path, p);
    }
    if (modifyContent) {
      try {
        replace.sync({
          files: p,
          from: modifyContent.from,
          to: modifyContent.to,
        });
      } catch (error) {
        console.error('Couldnt modify content:', error);
      }
    }
  };

  // Clean already generated one
  shell.rm('-rf', 'template');

  shell.mkdir('template');

  // We want only pre-commit hook with custom script excluded
  shell.mkdir('template/.husky');
  copyToTemplate('.husky/pre-commit', false, {
    from: /yarn verify-startingTemplate-changes/g,
    to: '',
  });

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
