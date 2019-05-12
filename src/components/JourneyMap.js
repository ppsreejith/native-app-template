import React from 'react'
import UnitMap from '../components/UnitMap';
import _ from 'lodash';

const JourneyMap = ({journey, style}) => {
  const params = {
    entities: _.map(journey, ({entity}) => entity),
    routes: _.map(journey, ({route, entity}) => [route,entity.type]),
    times: _.map(journey, ({time}) => time),
    style,
  };
  return (<UnitMap {...params} />)
}

export default JourneyMap;
