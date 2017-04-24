/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
// import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
// import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
// import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
// import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
// import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
// import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
// import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
// import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
// import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
// import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
/* eslint-enable import/no-unresolved, import/extensions */
import 'babel-polyfill';
import { browserHistory } from 'react-router';
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
import 'sanitize.css/sanitize.css';
import 'global-styles';
import createApi from 'createApi';
import './setup/openSansObserver';
import ensureIntlSupport from './setup/ensureIntlSupport';
import configureStore from './store';
import renderInBrowser from './renderInBrowser';
import createRoutes from './routes';
import { translationMessages as messages } from './i18n';

const initialState = window ? (window.APP_STATE || {}) : {};
const api = createApi();
const store = configureStore(initialState, browserHistory, api);

const routes = createRoutes(store);

function render() {
  renderInBrowser({ messages, store, routes, history: browserHistory, api });
}
ensureIntlSupport()
  .then(render);

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', render);
}
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
