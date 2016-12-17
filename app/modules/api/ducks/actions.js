import { REQUEST_SMS_CODE, FETCH_PROFILE, UPLOAD_AVATAR, UPLOAD_AVATAR_PROGRESS, FETCH_CATALOG_TYPES } from './constants';

export const requestSmsCode = (phone) => ({
  type: REQUEST_SMS_CODE,
  payload: { phone },
});

export const uploadAvatar = ({ filename, dataUrl, onprogress }) => ({
  type: UPLOAD_AVATAR,
  payload: { filename, dataUrl, onprogress },
});

export const uploadAvatarProgress = (percent) => ({
  type: UPLOAD_AVATAR_PROGRESS,
  payload: { percent },
});

export const fetchProfile = () => ({ type: FETCH_PROFILE, payload: {} });

export const fetchCatalogTypes = () => ({ type: FETCH_CATALOG_TYPES, payload: {} });
