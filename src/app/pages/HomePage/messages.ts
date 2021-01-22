/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  routingTitle: () =>
    _t(
      translations.routingFeature.title,
      'Industry-standard Routing', // you can set the default value when extracting
    ),
  routingDescription: () => _t(translations.routingFeature.description),
  feedbackTitle: () => _t(translations.feedbackFeature.title),
  feedbackDescription: () => _t(translations.feedbackFeature.description),
  scaffoldingTitle: () => _t(translations.scaffoldingFeature.title),
  scaffoldingDescription: () => _t(translations.scaffoldingFeature.description),
  i18nTitle: () => _t(translations.i18nFeature.title),
  i18nDescription: () => _t(translations.i18nFeature.description),
};
