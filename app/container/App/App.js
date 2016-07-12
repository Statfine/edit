/**
 * Created by eastiming on 16/7/12.
 */

import React, { Component, PropTypes } from 'react';

class App extends Component {

  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
