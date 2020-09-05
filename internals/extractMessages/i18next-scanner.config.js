var fs = require('fs');
const path = require('path');
const typescript = require('typescript');
const compilerOptions = require('../../tsconfig.json').compilerOptions;

const stringfyTranslationObjects = require('./stringfyTranslations.js');

module.exports = {
  input: [
    'src/app/**/**.{ts,tsx}',
    '!**/node_modules/**',
    '!src/app/**/*.test.{ts,tsx}',
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    func: {
      list: ['t'],
      extensions: [''], // We dont want this extension because we manually check on transform function below
    },
    lngs: ['en', 'de'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    keySeparator: '.', // char to separate keys
    nsSeparator: ':', // char to split namespace from key
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function transform(file, enc, done) {
    const extensions = ['.ts', '.tsx'];

    const { base, ext } = path.parse(file.path);
    if (extensions.includes(ext) && !base.includes('.d.ts')) {
      const content = fs.readFileSync(file.path, enc);
      const shouldStringfyObjects = base === 'messages.ts';
      parseContent(content, this.parser, shouldStringfyObjects);
    }

    done();
  },
};
function parseContent(content, parser, shouldStringfyObjects = true) {
  const { outputText } = typescript.transpileModule(content, {
    compilerOptions: compilerOptions,
  });
  let cleanedContent = outputText;
  if (shouldStringfyObjects) {
    cleanedContent = stringfyTranslationObjects(outputText);
  }
  parser.parseFuncFromString(cleanedContent);
}

module.exports.parseContent = parseContent;
