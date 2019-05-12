import { combineReducers } from 'redux';

import test from './test';
import journey from './journey';
import appState from './appState';

export default combineReducers({
  test,
  journey,
  appState
});
