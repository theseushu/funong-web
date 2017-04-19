export default function ensureIntlSupport() {
  if (process.env.browser && window.Intl) return Promise.resolve();
  return new Promise((resolve) => {
    resolve(System.import('intl'));
  })
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/de.js'),
    ]));
}
