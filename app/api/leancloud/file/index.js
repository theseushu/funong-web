import { fileToJSON } from '../converters';
const debug = require('debug')('app:api:file');

export default ({ AV, context: { token: { sessionToken }, profile } }) => {
  const uploadFile = async ({ filename, file, onprogress, metaData = {} }) => {
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

  const uploadAvatar = async ({ profileId, filename, file, onprogress }) => {
    try {
      const metaData = { owner: profileId, isAvatar: true };
      const uploadedFile = await uploadFile({ filename, file, onprogress, metaData });
      await AV.Query.doCloudQuery('update Profile set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, profileId], {
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
