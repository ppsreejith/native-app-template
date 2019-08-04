import { combineReducers } from 'redux';

import test from './test';
import user from './user';
import currentgame from './currentgame';

export default combineReducers({
  test,
  user,
  currentgame
});
