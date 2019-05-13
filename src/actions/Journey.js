import _ from 'lodash';

import { getRoutes } from '../utils/Routing';
import Store from '../utils/Store';

const time = 1556460882000;

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
                        const firstJourney = {
                          entity: {
                            coordinate: firstJourneyStart,
                            type: "PERSON",
                            occupancy: "NONE",
                            distance: 0.3,
                            fare: 0,
                            time: 15
                          },
                          route: [firstJourneyStart, firstJourneyEnd],
                          time: {
                            coordinate: firstJourneyEnd,
                            time: new Date()
                          }
                        };
                        const lastJourney = {
                          entity: {
                            coordinate: lastJourneyStart,
                            type: "PERSON",
                            occupancy: "NONE",
                            distance: 0.3,
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
