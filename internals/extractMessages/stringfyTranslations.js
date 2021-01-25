/**
 * This is custom intermediate function to convert translations objects to i18next resource strings
 * `i18next-scanner expects strings such like:
 *
 * <A>{t('a.b')}</A>
 *
 * but translations object enables us to write the same thing as:
 *
 * <A>{t(translations.a.b)}</A>
 *
 * So, this function converts them into strings like the first one so that scanner recognizes
 */

function stringfyTranslationObjects(content) {
  let contentWithObjectsStringified = content;
  const pattern = /_t\((.+?)[),]/gim;
  const matches = content.matchAll(pattern);
  for (const match of matches) {
    if (match.length < 1) {
      continue;
    }
    const key = match[1];
    let keyAsStringValue = '';
    if (["'", '"', '`'].some(x => key.includes(x))) {
      keyAsStringValue = key;
    } else {
      keyAsStringValue = stringifyRecursively(content, key);
      keyAsStringValue = `'${keyAsStringValue}'`;
    }
    contentWithObjectsStringified = replaceTranslationObjectWithString(
      contentWithObjectsStringified,
      key,
      keyAsStringValue,
    );
  }
  return contentWithObjectsStringified;
}

// Recursively concatenate all the `variables` until we hit the imported translations object
function stringifyRecursively(content, key) {
  let [root, ...rest] = key.split('.');
  const pattern = `${root} =(.+?);`;
  const regex = RegExp(pattern, 'gim');
  let match = regex.exec(content);
  if (match && match.length > 1) {
    const key = match[1].trim();
    root = stringifyRecursively(content, key);
  } else if (isImportedTranslationObject(content, root)) {
    root = null;
  }

  if (root != null) {
    return [root, ...rest].join('.');
  } else {
    return [...rest].join('.');
  }
}

function isImportedTranslationObject(content, key) {
  const pattern = `import {.*?${key}.*?} from.+locales/translations.*`;
  return RegExp(pattern, 'gim').test(content);
}

function replaceTranslationObjectWithString(content, key, keyAsStringValue) {
  return content.replace(`_t(${key}`, `t(${keyAsStringValue}`);
}

module.exports = stringfyTranslationObjects;
