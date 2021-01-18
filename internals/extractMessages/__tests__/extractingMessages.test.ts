import scannerConfig from '../i18next-scanner.config';
import i18nextScanner from 'i18next-scanner';

describe('extracting messages', () => {
  const options = scannerConfig.options;
  options.defaultNs = 'translation_test';
  const ns = options.defaultNs;
  let parser = new i18nextScanner.Parser(options);

  beforeEach(() => {
    parser = new i18nextScanner.Parser(options);
  });

  it('extract object with default values', () => {
    const content = `
      import { translations } from 'locales/translations';
      export const messages = {
        x: () => _t(translations.a),
        x: () => _t(translations.a.k1),
        x: () => _t(translations.a.k2, "v1"),
        x: () => _t(translations.a.k3, "v1", {a: "b"}),
      };
    `;
    scannerConfig.parseContent(content, parser);
    const result = parser.get({ sort: true });
    expect(result.en[ns].a.k1).toBe('');
    expect(result.en[ns].a.k2).toBe('v1');
    expect(result.en[ns].a.k3).toBe('v1');
  });

  it('extract strings with default values', () => {
    const content = `
      import { translations } from 'locales/translations';
      export const messages = {
        x: () => _t("a"),
        x: () => _t("a.k1"),
        x: () => _t("a.k2", "v1"),
        x: () => _t("a.k3", "v1", {a: "b"}),
      };
    `;
    scannerConfig.parseContent(content, parser);
    const result = parser.get({ sort: true });
    expect(result.en[ns].a.k1).toBe('');
    expect(result.en[ns].a.k2).toBe('v1');
    expect(result.en[ns].a.k3).toBe('v1');
  });

  it('extract nested objects', () => {
    const content = `
      import { translations } from 'locales/translations';
      const m = translations.a;
      export const messages = {
        x: () => _t(m.k1),
        x: () => _t(m.k2, "v1"),
      };
    `;
    scannerConfig.parseContent(content, parser);
    const result = parser.get({ sort: true });
    expect(result.en[ns].a.k1).toBe('');
    expect(result.en[ns].a.k2).toBe('v1');
  });

  it('extract strings in react components', () => {
    const content = `
    export function HomePage() {
      return (
        <div>
          <span>{t('a.k1')}</span>
          <span>{t('a.k2', 'v1')}</span>
        </div>
      );
    }
    `;
    scannerConfig.parseContent(content, parser);
    const result = parser.get({ sort: true });
    expect(result.en[ns].a.k1).toBe('');
    expect(result.en[ns].a.k2).toBe('v1');
  });
});
