import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  name: 'Vernacular',
  score: 10,
  stats:{
    batting:{
      runs:100,
      highScore: 20,
      average: 30,
      strikeRate: 90
    },
    bowling:{
      wickets:8,
      economy: 7,
      average: 23,
      threeW : 2
    }
  },
  matchData:{
    wins:4,
    losses: 2,
    matches:[
      {
        opponent: 'Op1',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        result : 'win',
        margin: '2 runs'
      },
      {
        opponent: 'Op2',
        result : 'loss',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        margin: '1 wicket'
      },
      {
        opponent: 'Op2',
        result : 'win',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        margin: '12 runs'
      },
      {
        opponent: 'Op3',
        result : 'loss',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        margin: '2 runs'
      },
      {
        opponent: 'Op4',
        result : 'win',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        margin: '2 wickets'
      },
      {
        opponent: 'Op5',
        result : 'win',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1nG20oHI9PE-Bo7SzNaQDd5f2EMCb5viKy9-_0h7oMj7Fo3evg',
        margin: '3 runs'
      }
    ]
  }
});

const reducers = {
  TEST_RECEIVED: (state, { name }) => state.set('name', name)
};

export default createReducer(initialState, reducers);
