import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  let messages;
  switch (locale) {
    case 'en':
      messages = (await import('./locales/en.json')).default;
      break;
    case 'es':
    default:
      messages = (await import('./locales/es.json')).default;
      break;
  }

  return {
    locale,
    messages
  };
});
