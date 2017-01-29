const debug = require('debug')('app:api:certs');

export default ({ AV, sessionToken, userId }) => {
  class Cert extends AV.Object {}
  AV.Object.register(Cert);

// TODO deal with empty catalogType
  const fetchCerts = () => new AV.Query('Cert')
    .equalTo('user', AV.Object.createWithoutData('_User', userId))
    .include(['images'])
    .find({ sessionToken })
    .then((certs) => certs.map((cert) => ({ ...cert.toJSON(), images: cert.get('images') ? cert.get('images').map(fileToJSON) : [] })));

  const createCert = async (attrs) => {
    const certs = new Cert();
    certs.set('user', AV.Object.createWithoutData('_User', userId));
    const attributes = { ...attrs };
    if (attrs.images) {
      attributes.images = attrs.images.map((image) => AV.Object.createWithoutData('_File', image.id));
    }
    const requestParams = { sessionToken };
    const savedCerts = await certs.save(attributes, requestParams);
    return savedCerts.toJSON();
  };

  const updateCert = async ({ objectId, ...attrs }) => {
    try {
      const certs = AV.Object.createWithoutData('Cert', objectId);
      const attributes = { ...attrs };
      if (attrs.images) {
        attributes.images = attrs.images.map((image) => AV.Object.createWithoutData('_File', image.id));
      }
      const { updateAt } = certs.save(attributes, { sessionToken });
      return { ...attrs, objectId, updateAt };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchCerts,
    createCert,
    updateCert,
    createSpecies,
  };
};
