import { fileToJSON } from '../../utils/converters';
const debug = require('debug')('app:api:profile');

export default ({ AV, userId, sessionToken }) => {
  class Profile extends AV.Object {}
  AV.Object.register(Profile);

  const fetchProfile = async () => {
    const user = await AV.Object.createWithoutData('_User', userId).fetch({ include: ['profile', 'profile.avatar', 'profile.desc.images'] }, { sessionToken });
    const result = { ...user.toJSON() };
    const avProfile = user.get('profile');
    if (avProfile) {
      const avAvatar = avProfile.get('avatar');
      const avatar = avAvatar ? avAvatar.toJSON() : undefined;
      const avDesc = avProfile.get('desc') || {};
      const desc = { ...avDesc, images: avDesc.images ? avDesc.images.map(fileToJSON) : [] };
      result.profile = { ...avProfile.toJSON(), avatar, desc };
    }
    return result;
  };

  const createProfile = async ({ type }) => {
    const profile = new Profile();
    profile.set('type', type);
    const requestParams = { sessionToken };
    const savedProfile = await profile.save(null, requestParams);
    await AV.Query.doCloudQuery('update _User set profile=pointer("Profile", ?) where objectId=?', [savedProfile.id, userId], {
      fetchWhenSave: true,
      sessionToken,
    });
    return savedProfile.toJSON();
  };

  const updateProfile = async ({ profileId, desc, ...attrs }) => {
    try {
      const profile = AV.Object.createWithoutData('Profile', profileId);
      const attributes = { ...attrs };
      if (desc) {
        if (desc.images) {
          profile.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
        } else {
          profile.set('desc', desc);
        }
      }
      profile.save(attributes, { sessionToken });
      return attrs;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    createProfile,
    fetchProfile,
    updateProfile,
  };
};
