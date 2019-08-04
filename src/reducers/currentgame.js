import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
    game: {
    matchId : 123,
    you: 'batting',
    opponent: 'bowling',
    inningsOneRuns : 0,
    inningsOneWickets : 0,
    inningsOneBalls : 0,
    inningsTwoRuns : 0,
    inningsTwoWickets : 0,
    inningsTwoBalls : 0,
    wicketsMax : 2,
    ballsMax : 6,
    runsDetails : [],
    innings: 1}
});

const reducers = {
  TEST_RECEIVED: (state, { name }) => state.set('name', name)
};

export default createReducer(initialState, reducers);
