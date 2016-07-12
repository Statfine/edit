/**
 * Created by eastiming on 16/7/12.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/lib/raised-button';

import * as appAction from '../../action/application';

export default class IndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { userInfoStatus, loginStatus } = nextProps.fetchStatus;
    console.log('userInfoStatus=====>' + userInfoStatus.isFetching);
    console.log('loginStatus=====>' + loginStatus.isFetching);
  }

  _handleClick = () => {
    alert('Click');
    this.props.login({ email: 'sj@easub.com', password: '123456' }, '1');
  };

  _handleGetk = () => {
    this.props.fetchUserInfo();
  }

  render() {

    return (
      <div style={{ backgroundColor: '#fff' }}>
        <RaisedButton
          label={'click'}
          fullWidth={true}
          onTouchTap={ this._handleClick }
        />
        <RaisedButton
          style={{ marginTop: '20px' }}
          label={'get'}
          fullWidth={true}
          onTouchTap={ this._handleGetk }
        />
      </div>
    );
  }
}

IndexContainer.propTypes = {
  application: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
};

export default connect(
  ({ application, fetchStatus }) => ({ application, fetchStatus }),
  { ...appAction, push }
)(IndexContainer);
