import _ from 'lodash';
import {getBid} from './Routing';
import Store from './Store';

export const listenToServer = () => {
  const startTime = Date.now();
  console.log("polling sserver");
  const id = Store.getState().locations.get("id");
  const next = (pollTime) => {
    setTimeout(listenToServer, pollTime || Math.max(1000 - Date.now() + startTime, 0));
  };
  const state = Store.getState();
  const appState = state.appState;

  const currentJourney = appState.get('currentJourney');
  const currentLeg = appState.get('currentLeg');
  const entityObj = state.journey.getIn(['journeys', currentJourney, 'journey', currentLeg, 'entity']);
  if (_.isEmpty(entityObj)) {
    return next();
  }
  const entity = entityObj.toJS();
  if (!entity.bidMade) {
    return next();
  }
  console.log("entity is", entity);
  getBid({ id: entity.bid_id }).then(bid => {
    console.log("bid iss", bid);
    if (bid.driver_id) {
      Store.dispatch({
        type: "JOURNEY_SET_AUTO_ACCEPTED",
        payload: {
          journey: currentJourney,
          leg: currentLeg,
          driver_id: bid.driver_id
        }
      })
      return next(5000); 
    }
    return next();
  }).catch(err => {
    console.log("error while fetching bid is", err);
    return next();
  });
};

setTimeout(() => {
  listenToServer();
}, 2000);
