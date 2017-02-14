/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { fileToJSON } from '../converters';
const debug = require('debug')('app:api:file');

export default ({ AV, context, updateContextProfile }) => {
  const uploadFile = async ({ filename, file, onprogress, metaData = {} }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      if (!sessionToken || !profile) {
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
    const { token: { sessionToken }, profile } = context;
    try {
      const metaData = { owner: profile.objectId, isAvatar: true };
      const uploadedFile = await uploadFile({ filename, file, onprogress, metaData });
      await AV.Query.doCloudQuery('update Profile set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, profile.objectId], {
        sessionToken,
      });
      const updatedProfile = { ...profile, avatar: uploadedFile };
      updateContextProfile(updatedProfile);
      return updatedProfile;
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
