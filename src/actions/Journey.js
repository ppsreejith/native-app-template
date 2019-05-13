import _ from 'lodash';

import { getRoutes, createBid } from '../utils/Routing';
import Store from '../utils/Store';

const time = 1556460882000;

function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344
    return dist;
  }
}

export const fetchJourneys = ({
  fromLat,
  fromLng,
  toLat,
  toLng
}) => {
  getRoutes({
    fromLat,
    fromLng,
    toLat,
    toLng
  }).then(res => {
    const journeys = _.chain(res)
                      .get("journeys", [])
                      .map(({
                        Segments,
                        Vehicles
                      }, index) => {
                        const segmentRoutes = _.chain(Segments)
                                               .map(({FromStop}) => _.get(FromStop, "LineRef"))
                                               .uniq()
                                               .value();
                        const groupedSegments = _.groupBy(Segments, "FromStop.LineRef");
                        const busJourney = _.map(segmentRoutes, (segmentRoute) => {
                          const segments = groupedSegments[segmentRoute];
                          const route = _.chain(
                            segments
                          ).map(({
                            FromStop,
                            ToStop
                          }) => ([{
                            latitude: _.get(FromStop, "Location.Latitude"),
                            longitude: _.get(FromStop, "Location.Longitude"),
                          }, {
                            latitude: _.get(ToStop, "Location.Latitude"),
                            longitude: _.get(ToStop, "Location.Longitude"),
                          }])).flatten().value()
                          const entity = {
                            type: "BUS",
                            coordinate: _.sample(route),
                            occupancy: "NONE",
                            distance: 0.3,
                            fare: 0,
                            time: 15
                          }
                          const time = {
                            coordinate: _.last(route),
                            time: new Date()
                          }
                          return {
                            route,
                            entity,
                            time
                          }
                        });
                        const firstRoute = _.first(busJourney).route;
                        const firstJourneyStart = {
                          latitude: fromLat,
                          longitude: fromLng
                        };
                        const firstJourneyEnd = _.first(firstRoute);
                        const lastRoute = _.last(busJourney).route;
                        const lastJourneyStart = _.last(lastRoute);
                        const lastJourneyEnd = {
                          latitude: toLat,
                          longitude: toLng
                        };
                        const autoKm = Store.getState().appState.get('maxWalkingValue');
                        const firstStopDistance = distance(
                          firstJourneyStart.latitude,
                          firstJourneyStart.longitude,
                          firstJourneyEnd.latitude,
                          firstJourneyEnd.longitude,
                        );
                        const firstJourney = {
                          entity: {
                            coordinate: firstJourneyStart,
                            type: firstStopDistance > autoKm ? "AUTO" : "PERSON",
                            occupancy: "NONE",
                            distance: firstStopDistance,
                            fare: 0,
                            time: 15
                          },
                          route: [firstJourneyStart, firstJourneyEnd],
                          time: {
                            coordinate: firstJourneyEnd,
                            time: new Date()
                          }
                        };
                        const lastStopDistance = distance(
                          lastJourneyStart.latitude,
                          lastJourneyStart.longitude,
                          lastJourneyEnd.latitude,
                          lastJourneyEnd.longitude,
                        );
                        const lastJourney = {
                          entity: {
                            coordinate: lastJourneyStart,
                            type: lastStopDistance > autoKm ? "AUTO" : "PERSON",
                            occupancy: "NONE",
                            distance: lastStopDistance,
                            fare: 0,
                            time: 15
                          },
                          route: [lastJourneyStart, lastJourneyEnd],
                          time: {
                            coordinate: lastJourneyEnd,
                            time: new Date()
                          }
                        };
                        const journey = _.concat(firstJourney, busJourney, lastJourney);
                        return {
                          journey,
                          title: `Journey no ${index}`
                        };
                      }).value();
    Store.dispatch({
      type: "JOURNEY_INITIALIZE",
      payload: { journeys }
    })
    console.log("Routes are", journeys);
  }).catch(err => {
    console.log("Error is", err);
  });
}

export const bookAuto = (dispatch, getState) => {
  const appState = getState().appState;
  const metermele = _.parseInt(appState.get('meterMeleAmount'))

  const currentJourney = appState.get('currentJourney');
  const currentLeg = appState.get('currentLeg');
  const journey = getState().journey.getIn(['journeys', currentJourney, 'journey', currentLeg]).toJS();
  console.log("Journey is", journey);
  createBid({
    user_id: 1,
    metermele,
    fromLat: _.get(journey, ['route', 0, 'latitude']),
    fromLng: _.get(journey, ['route', 0, 'longitude']),
    from_address: 'Ahmedabad',
    toLat: _.chain(journey).get('route').last().get('latitude').value(),
    toLng: _.chain(journey).get('route').last().get('longitude').value(),
    to_address: 'Ahmedabad',
  }).then(res => {
    console.log("Responses is", res);
    dispatch({
      type: "JOURNEY_SET_AUTO_BID",
      payload: {
        journey: currentJourney,
        leg: currentLeg,
        otp: res.otp
      }
    })
  })
}
