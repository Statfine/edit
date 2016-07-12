/**
 * Created by eastiming on 16/7/12.
 * 路由设置
 */
import history from '../config/history';
import * as utils from '../util/common';

module.exports = {
  component: require('../container/App/App'),
  childRoutes: [
    {
      path: '/',
      indexRoute: {
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('../container/IndexPage'));
          });
        },
      },
    },
  ],
};

function requireAuth(nextState) {
  const authInfo = utils.getAuthInfoFromStorage();

  if (utils.checkExpired(authInfo.expiresIn) &&
    authInfo.refreshToken.length === 0 &&
    authInfo.thirdPartyLogin !== '1') {
    history.go({
      nextPathname: nextState.location.pathname,
    }, '/');
  }
}
