import shell from 'shelljs';
import {
  crateTemplateFolder,
  removeTemplateFolder,
} from './create-template-folder';
import { shellEnableAbortOnFail, shellDisableAbortOnFail } from './utils';

const packageFolder = '.cra-template-rb';
interface Options {}

export function createNpmPackage(opts: Options = {}) {
  const abortOnFailEnabled = shellEnableAbortOnFail();

  shell.rm('-rf', `${packageFolder}`);

  crateTemplateFolder(opts);

  // Create a tarball archive and get filename of generated archive from stdout
  const archiveFilename = shell
    .exec(`npm pack`, { silent: true })
    .stdout.trim();

  shell.exec(
    `tar -xvf ${archiveFilename} && mv package ${packageFolder} && rm ${archiveFilename}`,
    { silent: true },
  );

  removeTemplateFolder();

  // Rename the files that NPM has special conditions back
  shell.mv(
    `${packageFolder}/template/npmrc`,
    `${packageFolder}/template/.npmrc`,
  );

  if (abortOnFailEnabled) shellDisableAbortOnFail();
  return packageFolder;
}

export function removeNpmPackage() {
  shell.rm('-rf', `${packageFolder}`);
}
