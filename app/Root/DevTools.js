/**
 * Created by eastiming on 16/7/12.
 */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-w"
               defaultPosition="bottom"
               defaultIsVisible={false}
  >
    <LogMonitor />
  </DockMonitor>
);
