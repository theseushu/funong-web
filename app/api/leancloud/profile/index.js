import { userToJSON } from '../converters';
const debug = require('debug')('app:api:profile');

export default ({ AV, context: { token: { objectId, sessionToken, mobilePhoneNumber }, profile }, updateContextProfile }) => {
  class Profile extends AV.Object {}
  AV.Object.register(Profile);

  const fetchProfile = async () => {
    try {
      const avProfile = await new AV.Query('Profile')
        .equalTo('user', AV.Object.createWithoutData('_User', objectId))
        .include(['avatar', 'images'])
        .first();
      let result;
      if (!avProfile) {
        const newProfile = new Profile();
        newProfile.set('mobilePhoneNumber', mobilePhoneNumber);
        const savedProfile = await newProfile.save(null, { sessionToken });
        result = userToJSON(savedProfile);
      } else {
        result = userToJSON(avProfile);
      }
      updateContextProfile(result);
      return result;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateProfile = async ({ images, ...attrs }) => {
    try {
      const avProfile = AV.Object.createWithoutData('Profile', profile.objectId);
      const attributes = { ...attrs };
      if (images) {
        avProfile.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      }
      await avProfile.save(attributes, { sessionToken });
      const updatedProfile = { ...profile, ...attrs, images: images || profile.images };
      updateContextProfile(updatedProfile);
      return updatedProfile;
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
