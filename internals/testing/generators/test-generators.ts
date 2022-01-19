import chalk from 'chalk';
import fs from 'fs';
import rimraf from 'rimraf';
import shell from 'shelljs';
import path from 'path';
import nodePlop from 'node-plop';

import { ComponentProptNames } from '../../generators/component';
import { rootStatePath, SliceProptNames } from '../../generators/slice';
import { PlopGenerator as PG } from 'node-plop';
import { componentVariations } from './componentVariations';
import { sliceVariations } from './sliceVariations';
import { baseGeneratorPath } from '../../generators/paths';

interface PlopGenerator extends PG {
  runActions: <T extends string | number>(props: { [P in T]: any }) => Promise<{
    changes: [];
    failures: [];
  }>;
}

process.chdir(path.join(__dirname, '../../generators'));

const plop = nodePlop('./plopfile.ts');
const componentGen = plop.getGenerator('component') as PlopGenerator;
const sliceGen = plop.getGenerator('slice') as PlopGenerator;

const BACKUPFILE_EXTENSION = 'rbgen';

async function generateComponents() {
  const variations = componentVariations();
  const promises: Promise<{ path: string; name: string }>[] = [];

  for (const variation of variations) {
    const p = componentGen
      .runActions<ComponentProptNames>(variation)
      .then(handleResult)
      .then(feedbackToUser(`Generated '${variation.componentName}'`))
      .then(_ => ({ name: variation.componentName, path: variation.path }));
    promises.push(p);
  }
  const components = await Promise.all(promises);

  // return a cleanup function
  const cleanup = () => {
    for (const component of components) {
      removeGeneratedComponent(component.path, component.name);
      feedbackToUser(`Cleaned '${component.name}'`)();
    }
  };
  return [cleanup];
}

async function generateSlices() {
  backupFile(rootStatePath);

  const variations = sliceVariations();
  const slices: { path: string; name: string }[] = [];

  for (const variation of variations) {
    const slice = await sliceGen
      .runActions<SliceProptNames>(variation)
      .then(handleResult)
      .then(feedbackToUser(`Generated '${variation.sliceName}'`))
      .then(_ => ({ name: variation.sliceName, path: variation.path }));
    slices.push(slice);
  }

  // return a cleanup function
  const cleanup = () => {
    restoreBackupFile(rootStatePath);

    for (const slice of slices) {
      removeGeneratedSlice(slice.path);
      feedbackToUser(`Cleaned '${slice.name}'`)();
    }
  };
  return [cleanup];
}

/**
 * Run
 */
(async function () {
  const componentCleanup = await generateComponents().catch(reason => {
    reportErrors(reason);
    return [];
  });
  const slicesCleanup = await generateSlices().catch(reason => {
    reportErrors(reason);
    return [];
  });

  // Run lint when all the components are generated to see if they have any linting erros
  const lintingResult = await runLinting()
    .then(reportSuccess(`Linting test passed`))
    .catch(reason => {
      reportErrors(reason, false);
      return false;
    });

  const tsResult = await checkTypescript()
    .then(reportSuccess(`Typescript test passed`))
    .catch(reason => {
      reportErrors(reason, false);
      return false;
    });

  const cleanups = [...componentCleanup, ...slicesCleanup];
  // Everything is done, so run the cleanups synchronously
  for (const cleanup of cleanups) {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  }

  if ((lintingResult && tsResult) === false) {
    process.exit(1);
  }
})();

function runLinting() {
  return new Promise<void>((resolve, reject) => {
    shell.exec(
      `yarn run lint`,
      {
        silent: false, // so that we can see the errors in the console
      },
      code => (code ? reject(new Error(`Linting failed!`)) : resolve()),
    );
  });
}

function checkTypescript() {
  return new Promise<void>((resolve, reject) => {
    shell.exec(
      `yarn run checkTs`,
      {
        silent: false, // so that we can see the errors in the console
      },
      code => (code ? reject(new Error(`Typescript failed!`)) : resolve()),
    );
  });
}

function removeGeneratedComponent(folderPath: string, name: string) {
  return rimraf.sync(path.join(baseGeneratorPath, folderPath, name));
}
function removeGeneratedSlice(folderPath: string) {
  return rimraf.sync(path.join(baseGeneratorPath, folderPath, 'slice'));
}

async function handleResult({
  changes,
  failures,
}: {
  changes: [];
  failures: [];
}) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(failures) && failures.length > 0) {
      reject(new Error(JSON.stringify(failures, null, 2)));
    }
    resolve(changes);
  });
}
function feedbackToUser(info) {
  return (result?: any) => {
    console.info(chalk.blue(info));
    return result;
  };
}

function reportSuccess(message: string) {
  return result => {
    console.log(chalk.green(` ✓ ${message}`));
    return result;
  };
}

function reportErrors(reason: Error, shouldExist = true) {
  console.error(chalk.red(` ✘ ${reason}`));
  if (shouldExist) {
    process.exit(1);
  }
}
function restoreBackupFile(
  path: string,
  backupFileExtension = BACKUPFILE_EXTENSION,
) {
  const backupPath = path.concat(`.${backupFileExtension}`);
  fs.copyFileSync(backupPath, path);
  fs.unlinkSync(backupPath);
}

function backupFile(path: string, backupFileExtension = BACKUPFILE_EXTENSION) {
  const targetFile = path.concat(`.${backupFileExtension}`);
  fs.copyFileSync(path, targetFile);
  return targetFile;
}
