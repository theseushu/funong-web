/**
 * Server side rendering application entry module.
 *
 * This module is being transpiled by webpack and placed under
 * server/middlewares/ as `generated.serverEntry.js`.
 *
 * The server uses it to render the app at given location.
 */
import 'babel-polyfill'; // for regeneratorRuntime
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { SheetsRegistryProvider, SheetsRegistry } from 'react-jss';
import { END } from 'redux-saga';
import Helmet from 'react-helmet';
import 'global-styles';
import createStore from 'store';
import createRoutes from 'routes';
import HtmlDocument from 'HtmlDocument';
import AppRoot from 'containers/AppRoot';
import { changeLocale } from 'containers/LanguageProvider/actions';
import monitorSagas from 'utils/monitorSagas';
import createApi from 'createApi';
import { actions as profileActions } from 'api/profile';

import { appLocales, translationMessages } from './i18n';

function renderAppToString(store, renderProps, sheets) {
  return renderToString(
    <SheetsRegistryProvider registry={sheets}>
      <AppRoot store={store} messages={translationMessages}>
        <RouterContext {...renderProps} />
      </AppRoot>
    </SheetsRegistryProvider>
  );
}

async function renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames }) {
  // 1st render phase - triggers the sagas
  const sheets = new SheetsRegistry();
  renderAppToString(store, renderProps, sheets);

  // send signal to sagas that we're done
  store.dispatch(END);

  // wait for all tasks to finish
  await sagasDone();

  // capture the state after the first render
  const state = store.getState();

  // 2nd render phase - the sagas triggered in the first phase are resolved by now
  const appMarkup = renderAppToString(store, renderProps, sheets);

  // capture the generated css

  // TODO jss
  const doc = renderToStaticMarkup(
    <HtmlDocument
      appMarkup={appMarkup}
      lang={state.language.locale}
      state={state}
      head={Helmet.rewind()}
      assets={assets}
      css={sheets.toString()}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;
}

function is404(routes) {
  return routes.some((r) => r.name === 'notfound');
}

async function renderAppToStringAtLocation(req, res, { webpackDllNames = [], assets, lang }, callback) {
  const url = req.url;
  const memHistory = createMemoryHistory(url);

  const api = createApi(req, res);

  const store = createStore({}, memHistory, api);

  if (api.tokenExists()) {
    await new Promise((resolve) => {
      store.dispatch(profileActions.fetch({
        meta: {
          resolve,
          reject: () => {
            api.logout();
          },
        },
      }));
    });
  }
  const routes = createRoutes(store);

  const sagasDone = monitorSagas(store);

  store.dispatch(changeLocale(lang));
  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback({ error });
    } else if (redirectLocation) {
      callback({ redirectLocation: redirectLocation.pathname + redirectLocation.search });
    } else if (renderProps) {
      renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames })
        .then((html) => {
          const notFound = is404(renderProps.routes);
          callback({ html, notFound });
        })
        .catch((e) => callback({ error: e }));
    } else {
      callback({ error: new Error('Unknown error') });
    }
  });
}

export {
  appLocales,
  renderAppToStringAtLocation,
};
