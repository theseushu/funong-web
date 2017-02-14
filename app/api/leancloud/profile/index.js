/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { userToJSON } from '../converters';
const debug = require('debug')('app:api:profile');

export default ({ AV, context, updateContextProfile }) => {
  class Profile extends AV.Object {}
  AV.Object.register(Profile);

  const fetchProfile = async () => {
    const { token: { objectId, sessionToken, mobilePhoneNumber } } = context;
    try {
      const avProfile = await new AV.Query('Profile')
        .equalTo('user', AV.Object.createWithoutData('_User', objectId))
        .include(['avatar', 'images'])
        .first();
      let result;
      if (!avProfile) {
        const newProfile = new Profile();
        newProfile.set('mobilePhoneNumber', mobilePhoneNumber);
        const phone = mobilePhoneNumber.toString();
        newProfile.set('name', `${phone.substring(0, 3)}**${phone.substring(phone.length - 2, phone.length)}`);
        newProfile.set('user', AV.Object.createWithoutData('_User', objectId));
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
    const { token: { sessionToken }, profile } = context;
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

  const fetchAdmins = async () => {
    const { token: { sessionToken } } = context;
    try {
      const adminUsers = await new AV.Query('Profile').containedIn('roles', ['admin', 'super']).find({ sessionToken });
      return adminUsers.map(userToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchUsers = async ({ mobilePhoneNumber, skip, limit }) => {
    const { token: { sessionToken } } = context;
    try {
      const query = new AV.Query('Profile');
      if (mobilePhoneNumber) {
        query.contains('mobilePhoneNumber', mobilePhoneNumber);
      }
      query.skip(skip).limit(limit);
      const users = await query.find({ sessionToken });
      return users.map(userToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const countAllUsers = async () => {
    const { token: { sessionToken } } = context;
    try {
      const count = await new AV.Query('Profile').count({ sessionToken });
      return count;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchProfile,
    updateProfile,
    fetchAdmins,
    countAllUsers,
    fetchUsers,
  };
};
