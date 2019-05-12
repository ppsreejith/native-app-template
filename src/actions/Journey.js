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
                        const groupedSegments = _.groupBy(Segments, "FromStop.LineRef");
                        const journey = _.map(groupedSegments, (segments) => {
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
