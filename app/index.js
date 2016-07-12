/**
 * Created by eastiming on 16/7/12.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root/Root';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as appAction from './action/application';
import { camelizeKeys } from 'humps';
injectTapEventPlugin();

const store = configureStore();

let history = null;

const { browserHistory } = require('react-router');
history = syncHistoryWithStore(browserHistory, store);


function start() {
  if (process.env.NODE_ENV === 'development') {
    const Perf = require('react-addons-perf');
    Perf.start();
    window.printWasted = Perf.printWasted;
    window.printInclusive = Perf.printInclusive;
    window.printExclusive = Perf.printExclusive;
  }

  function messageRecv(e) {
    if (e.key === 'oauth2' && e.newValue) {
      const oauthInfo = camelizeKeys(JSON.parse(e.newValue));
      store.dispatch(appAction.thirdPartyLogin(oauthInfo));
    }
  }

  window.addEventListener('storage', messageRecv);

  render(
    (
      <Provider store={store}>
        <Root history={history} />
      </Provider>
    ),
    document.getElementById('app')
  );
}

if (!global.Intl) {
  require.ensure(['intl'], require => {
    /* eslint-disable */
    require('intl').default;
    start();
  }, 'IntlBundle');
} else {
  start();
}
