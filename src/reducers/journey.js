import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  currentLeg: 1,
  journeys: [
    {
      title: "Optimized for Time",
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "HOME",
            occupancy: "NONE",
            distance: 0.3,
            fare: 0,
            time: 15
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "AUTO",
            occupancy: "NONE",
            distance: 2,
            fare: 26,
            time: 10
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        }
      ]
    },
    {
      title: "Optimized for Comfort",
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "PERSON",
            occupancy: "NONE",
            distance: 0.3,
            fare: 0,
            time: 15
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "AUTO",
            occupancy: "NONE",
            distance: 2,
            fare: 26,
            time: 10
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        }
      ]
    },
    {
      title: "Optimized for Fare",
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "PERSON",
            occupancy: "NONE",
            distance: 0.3,
            fare: 0,
            time: 15
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.931093,
              longitude: 77.628987,
            },
            type: "AUTO",
            occupancy: "NONE",
            distance: 2,
            fare: 26,
            time: 10
          },
          route: [{
            latitude: 12.931093,
            longitude: 77.628987,
          }, {
            latitude: 12.991093,
            longitude: 77.828987,
          }],
          time: {
            coordinate: {
              latitude: 12.991093,
              longitude: 77.828987,
            },
            time: new Date()
          }
        }
      ]
    }
  ]
});

const reducers = {
  JOURNEY_UPDATE_LEG: (state, { leg }) => state.setIn(['currentLeg'], leg)
};

export default createReducer(initialState, reducers);
