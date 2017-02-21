import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';

const thumbnailURL = function thumbnailURL(width, height, q, scaleToFit, f) {
  const url = this.attributes.url;
  if (!url) {
    throw new Error('Invalid url.');
  }
  if (!width || !height || width <= 0 || height <= 0) {
    throw new Error('Invalid width or height value.');
  }
  const quality = q || 100;
  if (quality <= 0 || quality > 100) {
    throw new Error('Invalid quality value.');
  }
  const fmt = f || 'png';
  const mode = scaleToFit ? 2 : 1;
  return `${url}?imageView/${mode}/w/${width}/h/${height}/q/${quality}/format/${fmt}`;
};

export const fileToJSON = (file) => {
  if (file && file.get('url')) {
    return {
      ...file.toJSON(),
      metaData: file.get('metaData'),
      thumbnail_80_80: thumbnailURL.bind(file)(80, 80, 100, false),
      thumbnail_160_160: thumbnailURL.bind(file)(160, 160, 100, false),
      thumbnail_300_300: thumbnailURL.bind(file)(300, 300, 100, false),
      thumbnail_600_600: thumbnailURL.bind(file)(600, 600, 100, false),
    };
  }
  return undefined;
};

const imagesToJSON = (images) => images.map(fileToJSON).filter((f) => !_isUndefined(f));

const lnglatToJSON = (lnglat) => lnglat ? lnglat.toJSON() : undefined;

const embeddedUserToJSON = (user) => {
  if (!user) {
    return undefined;
  }
  const { objectId, name, mobilePhoneNumber, badges } = user.toJSON();
  const avatar = fileToJSON(user.get('avatar'));
  const roles = user.get('roles');
  return _omitBy({ objectId, name, mobilePhoneNumber, badges, avatar, roles }, _isUndefined);
};

export const embeddedShopToJSON = (shop) => {
  if (!shop) {
    return undefined;
  }
  const { objectId, address, name } = shop.toJSON();

  const thumbnail = fileToJSON(shop.get('thumbnail'));
  const lnglat = lnglatToJSON(shop.get('lnglat'));
  const owner = embeddedUserToJSON(shop.get('owner'));

  return _omitBy({ objectId, thumbnail, name, location: { address, lnglat }, owner }, _isUndefined);
};

export const embeddedCatalogToJSON = (catalog) => {
  if (!catalog) {
    return undefined;
  }
  const { objectId, name } = catalog.toJSON();
  return _omitBy({ objectId, name }, _isUndefined);
};

export const embeddedCategoryToJSON = (category) => {
  if (!category) {
    return undefined;
  }
  const { objectId, name } = category.toJSON();
  const catalog = embeddedCatalogToJSON(category.get('catalog'));
  return _omitBy({ objectId, name, catalog }, _isUndefined);
};

export const embeddedSpeciesToJSON = (species) => {
  if (!species) {
    return undefined;
  }
  const { objectId, name } = species.toJSON();
  const category = embeddedCategoryToJSON(species.get('category'));
  return _omitBy({ objectId, name, category }, _isUndefined);
};

export const roleToJSON = (role) => ({ objectId: role.id, name: role.getName() });

export const userToJSON = (user) => {
  if (!user) {
    return null;
  }
  const { objectId, name, mobilePhoneNumber, desc, badges, roles } = user.toJSON();
  const avatar = fileToJSON(user.get('avatar'));
  const images = imagesToJSON(user.get('images'));
  const avCreatedAt = user.get('createdAt');
  const avUpdatedAt = user.get('updatedAt');
  const createdAt = avCreatedAt ? avCreatedAt.getTime() : undefined;
  const updatedAt = avUpdatedAt ? avUpdatedAt.getTime() : undefined;
  return _omitBy({ objectId, name, mobilePhoneNumber, desc, avatar, images, roles, badges, createdAt, updatedAt }, _isUndefined);
};

export const certToJSON = (cert) => {
  if (!cert) {
    return null;
  }
  const { objectId, type, fields, status } = cert.toJSON();
  const images = imagesToJSON(cert.get('images'));
  const owner = cert.get('owner');
  const createdAt = cert.get('createdAt').getTime();
  const updatedAt = cert.get('updatedAt').getTime();
  return _omitBy({ objectId, type, status, images, fields, owner: embeddedUserToJSON(owner), createdAt, updatedAt }, _isUndefined);
};

export const shopToJSON = (shop) => {
  if (!shop) {
    return null;
  }
  const { objectId, address, desc, name, areas } = shop.toJSON();

  const thumbnail = fileToJSON(shop.get('thumbnail'));
  const lnglat = lnglatToJSON(shop.get('lnglat'));
  const images = imagesToJSON(shop.get('images'));
  const owner = embeddedUserToJSON(shop.get('owner'));
  const createdAt = shop.get('createdAt').getTime();
  const updatedAt = shop.get('updatedAt').getTime();

  return _omitBy({ objectId, thumbnail, desc, name, areas, location: { address, lnglat }, images, owner, updatedAt, createdAt }, _isUndefined);
};

export const shopProductToJSON = (product) => {
  if (!product) {
    return null;
  }
  const { objectId, name, agentable, status, available, recommended, desc, specs, labels } = product.toJSON();

  const category = embeddedCategoryToJSON(product.get('category'));
  const species = embeddedSpeciesToJSON(product.get('species'));
  const images = imagesToJSON(product.get('images'));
  const shop = embeddedShopToJSON(product.get('shop'));
  const thumbnail = fileToJSON(product.get('thumbnail'));
  const createdAt = product.get('createdAt').getTime();
  const updatedAt = product.get('updatedAt').getTime();

  return _omitBy({ objectId, name, agentable, status, available, recommended, desc, specs, labels, category, species, images, shop, thumbnail, updatedAt, createdAt }, _isUndefined);
};

export const supplyProductToJSON = (product) => {
  if (!product) {
    return null;
  }
  const { objectId, name, address, status, available, desc, specs, labels } = product.toJSON();

  const lnglat = lnglatToJSON(product.get('lnglat'));
  const category = embeddedCategoryToJSON(product.get('category'));
  const species = embeddedSpeciesToJSON(product.get('species'));
  const images = imagesToJSON(product.get('images'));
  const owner = embeddedUserToJSON(product.get('owner'));
  const thumbnail = fileToJSON(product.get('thumbnail'));
  const createdAt = product.get('createdAt').getTime();
  const updatedAt = product.get('updatedAt').getTime();

  return _omitBy({ objectId, location: { address, lnglat }, name, status, available, desc, specs, labels, category, species, images, thumbnail, owner, updatedAt, createdAt }, _isUndefined);
};

export const logisticsToJSON = (product) => {
  if (!product) {
    return null;
  }
  const { objectId, name, address, status, available, capacity, price, maxNumber, range, desc, specs, labels } = product.toJSON();
  const lnglat = lnglatToJSON(product.get('lnglat'));
  const images = imagesToJSON(product.get('images'));
  const owner = embeddedUserToJSON(product.get('owner'));
  const thumbnail = fileToJSON(product.get('thumbnail'));
  const createdAt = product.get('createdAt').getTime();
  const updatedAt = product.get('updatedAt').getTime();
  return _omitBy({ objectId, location: { address, lnglat }, name, status, available, desc, specs, labels, capacity, price, maxNumber, range, images, thumbnail, owner, updatedAt, createdAt }, _isUndefined);
};

export const cartItemToJSON = (cartItem) => {
  if (!cartItem) {
    return null;
  }
  // TODO shop
  // const avShop = cartItem.get('shop');
  const avSupply = cartItem.get('supplyProduct');
  const supplyProduct = avSupply ? shopProductToJSON(avSupply) : null;
  const avShop = cartItem.get('shopProduct');
  const shopProduct = avShop ? shopProductToJSON(avShop) : null;
  const avOwner = cartItem.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const createdAt = cartItem.get('createdAt').getTime();
  const updatedAt = cartItem.get('updatedAt').getTime();

  return _omitBy({ ...cartItem.toJSON(), owner, supplyProduct, shopProduct, createdAt, updatedAt }, _isUndefined);
};
