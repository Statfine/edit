/**
 * Created by eastiming on 16/7/12.
 */
import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import routes from '../route';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import * as appAction from '../action/application';
import * as utils from '../util/common';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

@reactMixin.decorate(PureRenderMixin)
class Root extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      application: { expired },
      } = nextProps;

    const auth = utils.getAuthInfoFromStorage();
    if (window.location.pathname.indexOf('/invite/') > -1 ||
      window.location.pathname.indexOf('/pubregister') > -1 ||
      window.location.pathname.indexOf('/download') > -1
    ) {
      return false;
    } else if (expired && window.location.pathname  !== '/' && auth.refreshToken.length === 0) {
      window.location.replace('/');
    }
  }

  componentWillMount() {
    this.props.initStorageInfo();
  }

  componentDidMount() {
    this.props.checkTokenExpire();
  }

  render() {
    const { history} = this.props;
    return (
      <div>
        <IntlProvider>
          <Router history={history} routes={routes} />
        </IntlProvider>
      </div>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

export default connect(
  ({ application }) => ({ application }),
  { ...appAction }
)(Root);
