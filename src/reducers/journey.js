import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  journeys: [
    {
      title: "Optimized for Comfort",
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.906924,
              longitude: 77.5477435,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.892036,
            longitude: 77.559350,
          }, {
            latitude: 12.921812,
            longitude: 77.536137,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.5477435,
            },
            time: new Date()
          }
        }
      ]
    },
    {
      title: "Optimized for Time",
      journey: [
        {
          entity: {
            coordinate: {
              latitude: 12.891717,
              longitude: 77.5648125,
            },
            type: "PERSON",
            occupancy: "NONE",
            distance: 0.3,
            fare: 0,
            time: 15
          },
          route: [{
            latitude: 12.891398,
            longitude: 77.570275,
          }, {
            latitude: 12.892036,
            longitude: 77.559350,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.536583,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.908587,
              longitude: 77.5531445,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.892036,
            longitude: 77.559350,
          }, {
            latitude: 12.925138,
            longitude: 77.546939,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.536583,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.923475,
              longitude: 77.541538,
            },
            type: "AUTO",
            occupancy: "NONE",
            distance: 2,
            fare: 26,
            time: 10
          },
          route: [{
            latitude: 12.925138,
            longitude: 77.546939,
          }, {
            latitude: 12.921812,
            longitude: 77.536137,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.536583,
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
              latitude: 12.908587,
              longitude: 77.5531445,
            },
            type: "BUS",
            occupancy: "LOW",
            distance: 4,
            fare: 20,
            time: 18
          },
          route: [{
            latitude: 12.892036,
            longitude: 77.559350,
          }, {
            latitude: 12.925138,
            longitude: 77.546939,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.536583,
            },
            time: new Date()
          }
        },
        {
          entity: {
            coordinate: {
              latitude: 12.923475,
              longitude: 77.541538,
            },
            type: "AUTO",
            occupancy: "NONE",
            distance: 2,
            fare: 26,
            time: 10
          },
          route: [{
            latitude: 12.925138,
            longitude: 77.546939,
          }, {
            latitude: 12.921812,
            longitude: 77.536137,
          }],
          time: {
            coordinate: {
              latitude: 12.914929,
              longitude: 77.536583,
            },
            time: new Date()
          }
        }
      ]
    },
  ]
});

const reducers = {
  JOURNEY_INITIALIZE: (state, { journeys }) => Immutable.fromJS({
    currentJourneyBrowse : 0,
    currentJourney: null,
    currentLeg: null,
    journeys
  })
};

export default createReducer(initialState, reducers);