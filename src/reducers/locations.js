import Immutable from 'immutable';
import { createReducer } from '../utils';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  predictions: [],
  selected: {
  }
});

const reducers = {
  LOCATIONS_RECEIVED: (state, { predictions }) => state.set('predictions', Immutable.fromJS(predictions)),
  LOCATION_SELECTED: (state, { coordinates, description, reason }) => state.setIn(['selected', reason], { coordinates, description }),
};

export default createReducer(initialState, reducers);
