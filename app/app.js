/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions as profileActions } from 'api/profile';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';

// create an api instance with sessionToken attached
import createApi from './createApi';
import FullScreenGallery from './modules/fullScreenGallery';
import MapDialog from './modules/mapDialog';

const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const api = createApi();
const store = configureStore(initialState, browserHistory, api);

const tokenExists = api.tokenExists();
// token exists means there's sessionToken in cookies.
// if currentUser is not null,(which means store state is populated from ssr) we do nothing
// otherwise, fetch user's profile
if (tokenExists) {
  const currentUser = currentUserSelector(store.getState());
  if (!currentUser) {
    store.dispatch(profileActions.fetch());
  }
}
// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
  if (window) { // todo switch to standard client detection
    const galleryEl = document.createElement('div');
    galleryEl.setAttribute('id', '_fullScreenGallery_');
    document.body.appendChild(galleryEl);
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <FullScreenGallery />
        </LanguageProvider>
      </Provider>,
      galleryEl
    );
    const mapDialogEl = document.createElement('div');
    mapDialogEl.setAttribute('id', '_map_dialog_');
    document.body.appendChild(mapDialogEl);
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <MapDialog />
        </LanguageProvider>
      </Provider>,
      mapDialogEl
    );
  }
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

if (process.env.NODE_ENV !== 'production' && !document.getElementById('_dev_tools_')) {
  System.import('./DevTools').then((DevToolsModule) => {
    const DevTools = DevToolsModule.default;
    const devToolsEl = document.createElement('div');
    devToolsEl.setAttribute('id', '_dev_tools_');
    document.body.appendChild(devToolsEl);
    ReactDOM.render(
      <DevTools store={store} />
      , devToolsEl
    );
  });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
