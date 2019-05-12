import _ from 'lodash';
import request from './Network';

const baseURL = 'http://localhost:9999';

const getData = res => _.get(res, 'data');

export const getRoutes = ({ fromLat, fromLng, toLat, toLng }) => request({
  baseURL,
  url: `/routes/${fromLat},${fromLng}/${toLat},${toLng}`
});

export const getActiveBids = ({ fromLat, fromLng }) => request({
  baseURL,
  url: `/activebids/${fromLat},${fromLng}`
}).then(getData);

export const getBid = ({ id }) => request({
  baseURL,
  url: `/bids/${id}`
}).then(getData);

export const createBid = ({ user_id, metermele, from_lat, from_lng, from_address, to_lat, to_lng, to_address }) => request({
  baseURL,
  url: "/bids",
  method: 'POST',
  data: {
    user_id,
    metermele,
    from_lat,
    from_lng,
    from_address,
    to_lat,
    to_lng,
    to_address
  }
}).then(getData);

export const acceptBid = ({ bid_id, driver_id }) => request({
  baseURL,
  url: `/bids/${bid_id}`,
  method: 'POST',
  data: {
    driver_id
  }
}).then(getData);

export const getUser = ({ id }) => request({
  baseURL,
  url: `/users/${id}`
}).then(getData);

export const getDriver = ({ id }) => request({
  baseURL,
  url: `/drivers/${id}`
}).then(getData);
