import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  selectLanguage: () =>
    _t(
      translations.i18nFeature.selectLanguage,
      'Select Language', // default value
    ),
};
