'use client';

import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          readOnly: true,
          enabled: true,
        },
        analytics: {
          enabled: false,
          autoClear: {
            cookies: [
              {
                name: /^(_ga|_gid|_gat)/,
              },
            ],
          },
        },
        functional: {
          enabled: false,
        },
        ads: {
          enabled: false,
        },
      },
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'Your Privacy Matters',
              description:
                'We use cookies to ensure our website works correctly and to enhance your browsing experience. Optional cookies are used only with your consent.',
              acceptAllBtn: 'Accept All Cookies',
              acceptNecessaryBtn: 'Use Essential Only',
              showPreferencesBtn: 'Manage Preferences',
            },
            preferencesModal: {
              title: 'Your Privacy Settings',
              acceptAllBtn: 'Accept All Cookies',
              acceptNecessaryBtn: 'Use Essential Only',
              savePreferencesBtn: 'Save My Choices',
              sections: [
                {
                  title: 'Strictly Necessary Cookies',
                  description:
                    'These cookies are required for basic site functionality — such as navigation, security, and remembering your privacy preferences. They cannot be disabled.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytics Cookies',
                  description:
                    'These cookies help us understand how visitors use our website, enabling us to improve it. Data collected is anonymized.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Functional Cookies',
                  description:
                    'These cookies provide additional features and personalization, such as remembering your settings or enabling third-party services.',
                  linkedCategory: 'functional',
                },
                {
                  title: 'Advertising Cookies',
                  description:
                    'These cookies are used to deliver ads tailored to your interests and may be set by third-party advertisers.',
                  linkedCategory: 'ads',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
};

export default CookieConsentComponent;
