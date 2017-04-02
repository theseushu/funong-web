/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */
import _find from 'lodash/find';
import _without from 'lodash/without';
import { Realtime } from 'leancloud-realtime';
const debug = require('debug')('funongweb:api:realtime'); // eslint-disable-line no-unused-vars

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

const conversationToObject = (c, currentUser) => ({
  objectId: c.id,
  me: _find(c.get('users'), (u) => u.objectId === currentUser.objectId),
  user: _find(c.get('users'), (u) => u.objectId !== currentUser.objectId),
  updatedAt: c.updatedAt.getTime(),
  lastMessageAt: c.lastMessageAt ? c.lastMessageAt.getTime() : c.updatedAt.getTime(),
  lastMessage: c.lastMessage,
});

const conversations = {};

export const createConversation = async (currentUser, user) => {
  if (!imClient) {
    debug('Connection isnot created. check your code.');
  }
  const existing = _find(Object.values(conversations), (c) => _without(c.members, currentUser.objectId, user.objectId).length === 0);
  if (existing) {
    return conversationToObject(existing, currentUser);
  }
  const conversation = await imClient.createConversation({
    members: [currentUser.objectId, user.objectId],
    users: [currentUser, user].map((u) => ({ objectId: u.objectId, name: u.name, avatar: { url: u.avatar.url } })),
    transient: false,
    unique: true,
  });
  conversations[conversation.id] = conversation;
  return conversationToObject(conversation, currentUser);
};

export const quitConversation = async (id) => {
  if (!imClient) {
    debug('Connection isnot created. check your code.');
  }
  const conversation = conversations[id];
  if (!conversation) {
    debug(`There's not conversation ${id}.. check your code.`);
  }
  await conversation.quit();
  delete conversations[conversation.id];
  return id;
};
