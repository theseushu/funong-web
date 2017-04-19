/*
 * important! do not deconstruct context. eg:
 * export default ({ { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import { fileToJSON } from '../utils/converters';
const debug = require('debug')('app:api:file');

export default ({ context }) => {
  const uploadFile = async ({ filename, file, onprogress, metaData = {} }) => {
    const { token: { sessionToken } } = context;
    try {
      if (!sessionToken) {
        throw new AV.Error(AV.Error.SESSION_MISSING, '未登录用户不能上传文件');
      }
      const fileToUpload = new AV.File(filename, file);
      Object.keys(metaData).forEach((key) => fileToUpload.metaData(key, metaData[key]));
      const requestParams = { sessionToken };
      if (onprogress) {
        requestParams.onprogress = onprogress;
      }
      const uploadedFile = await fileToUpload.save(requestParams);
      return fileToJSON(uploadedFile);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const uploadAvatar = async ({ filename, file, onprogress }) => {
    const { token: { sessionToken, currentUserId } } = context;
    try {
      const metaData = { owner: currentUserId, isAvatar: true };
      const uploadedFile = await uploadFile({ filename, file, onprogress, metaData });
      await AV.Query.doCloudQuery('update _User set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, currentUserId], {
        sessionToken,
      });
      return uploadedFile;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    uploadFile,
    uploadAvatar,
  };
};
