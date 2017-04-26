import React from 'react';
import ReactDOM from 'react-dom';
import { match, applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppRoot from 'containers/AppRoot';
import FullScreenGallery from 'modules/fullScreenGallery';
import MapDialog from 'modules/mapDialog';
import { actions as mapActions } from 'api/map';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions as profileActions } from 'api/profile';

export default function renderInBrowser({ messages, store, routes, history, api }) {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <AppRoot store={store} messages={messages}>
        <Router
          {...renderProps}
          render={
            // Scroll to top when going to a new page, imitating default browser behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </AppRoot>,
      document.getElementById('app'), () => {
        const ssStyles = document.getElementById('server-side-styles');
        ssStyles.parentNode.removeChild(ssStyles);
      },
    );
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
    store.dispatch(mapActions.getCurrentLocation());
  });
  if (process.env.browser) { // todo switch to standard client detection
    const galleryEl = document.createElement('div');
    galleryEl.setAttribute('id', '_fullScreenGallery_');
    document.body.appendChild(galleryEl);
    ReactDOM.render(
      <AppRoot store={store} messages={messages}>
        <FullScreenGallery />
      </AppRoot>,
      galleryEl
    );
    const mapDialogEl = document.createElement('div');
    mapDialogEl.setAttribute('id', '_map_dialog_');
    document.body.appendChild(mapDialogEl);
    ReactDOM.render(
      <AppRoot store={store} messages={messages}>
        <MapDialog />
      </AppRoot>,
      mapDialogEl
    );
    if (process.env.NODE_ENV !== 'production') {
      if (localStorage) {
        localStorage.debug = 'funongweb*,funongbackend*,funongcommon*';
      }
      if (!document.getElementById('_dev_tools_')) {
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
    }
  }
}
