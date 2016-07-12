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

  _handleClick = () => {
    alert('Click');
    this.props.login({ email: 'sj@easub.com', password: '123456' }, '1');
  };

  render() {

    return (
      <div style={{ backgroundColor: '#fff' }}>
        <RaisedButton
          label={'click'}
          fullWidth={true}
          onTouchTap={ this._handleClick }
        />
      </div>
    );
  }
}

IndexContainer.propTypes = {
  application: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
};

export default connect(
  ({ application, fetchStatus }) => ({ application, fetchStatus }),
  { ...appAction, push }
)(IndexContainer);
