/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import { Realtime } from 'leancloud-realtime';
const debug = require('debug')('app:api:realtime'); // eslint-disable-line no-unused-vars

// TODO put these in configuration file
const APP_ID = 'ouy08OrFpGAJNxS1T69ceUH7-gzGzoHsz';
// const APP_KEY = 'JNUXol0O66lg5H24kxcmcnOt';

const realtime = new Realtime({
  appId: APP_ID,
  region: 'cn',
  // plugins: [AV.TypedMessagesPlugin], // 注册富媒体消息插件
});

export default realtime;

let imClient;
let _user; // eslint-disable-line
let _listeners; // eslint-disable-line
export const connect = async (user, listeners) => {
  if (imClient) {
    if (user || listeners) {
      debug('You shall not pass user/listeners to a created connection. Those params are ignored');
    }
    return imClient;
  }
  _user = user;
  _listeners = listeners;
  imClient = await realtime.createIMClient(user.objectId);
  _listeners.connected();
  imClient.on('disconnect', () => {
    _listeners.disconnect();
  });
  imClient.on('schedule', (attempt, delay) => {
    _listeners.schedule(attempt, delay);
  });
  imClient.on('retry', (attempt) => {
    _listeners.retry(attempt);
  });
  imClient.on('reconnect', () => {
    _listeners.reconnect();
  });
  return imClient;
};

export const disconnect = () => {
  if (!imClient) {
    debug('Connection isnot created. check your code.');
  }
  imClient.off('disconnect');
  imClient.off('schedule');
  imClient.off('retry');
  imClient.off('reconnect');
  imClient.close();
  imClient = null;
  _listeners.stopped();
};

export const retry = () => {
  if (!imClient) {
    debug('Connection isnot created. check your code.');
  }
  realtime.retry();
};
