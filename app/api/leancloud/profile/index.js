import { fileToJSON } from '../converters';
const debug = require('debug')('app:api:profile');

export default ({ AV, context: { token: { objectId, sessionToken, mobilePhoneNumber }, profile }, updateContextProfile }) => {
  class Profile extends AV.Object {}
  AV.Object.register(Profile);

  const fetchProfile = async () => {
    try {
      const avProfile = await new AV.Query('Profile')
        .equalTo('user', AV.Object.createWithoutData('_User', objectId))
        .include(['avatar', 'desc.images'])
        .first();
      let result;
      if (!avProfile) {
        const newProfile = new Profile();
        newProfile.set('mobilePhoneNumber', mobilePhoneNumber);
        const savedProfile = await newProfile.save(null, { sessionToken });
        result = savedProfile.toJSON();
      } else {
        const avAvatar = avProfile.get('avatar');
        const avatar = avAvatar ? fileToJSON(avAvatar) : undefined;
        const avDesc = avProfile.get('desc') || {};
        const desc = { ...avDesc, images: avDesc.images ? avDesc.images.map(fileToJSON) : [] };
        result = { ...avProfile.toJSON(), avatar, desc };
      }
      updateContextProfile(result);
      return result;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateProfile = async ({ desc, ...attrs }) => {
    try {
      const avProfile = AV.Object.createWithoutData('Profile', profile.objectId);
      const attributes = { ...attrs };
      if (desc) {
        if (desc.images) {
          avProfile.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
        } else {
          avProfile.set('desc', desc);
        }
      }
      await avProfile.save(attributes, { sessionToken });
      updateContextProfile({ ...profile, ...attrs });
      return attrs;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchProfile,
    updateProfile,
  };
};
