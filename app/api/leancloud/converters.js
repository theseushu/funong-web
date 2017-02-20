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
  if (file.get('url')) {
    return {
      ...file.toJSON(),
      metaData: file.get('metaData'),
      thumbnail_80_80: thumbnailURL.bind(file)(80, 80, 100, false),
      thumbnail_160_160: thumbnailURL.bind(file)(160, 160, 100, false),
      thumbnail_300_300: thumbnailURL.bind(file)(300, 300, 100, false),
      thumbnail_600_600: thumbnailURL.bind(file)(600, 600, 100, false),
    };
  }
  return null;
};

export const roleToJSON = (role) => ({ objectId: role.id, name: role.getName() });

export const userToJSON = (user) => {
  if (!user) {
    return null;
  }
  const avAvatar = user.get('avatar');
  const avatar = avAvatar ? fileToJSON(avAvatar) : undefined;
  const avImages = user.get('images');
  const images = avImages ? avImages.map(fileToJSON) : undefined;
  const roles = user.get('roles') || undefined;
  const avCreatedAt = user.get('createdAt');
  const avUpdatedAt = user.get('updatedAt');
  const createdAt = avCreatedAt ? avCreatedAt.getTime() : undefined;
  const updatedAt = avUpdatedAt ? avUpdatedAt.getTime() : undefined;
  return _omitBy({ ...user.toJSON(), avatar, images, roles, createdAt, updatedAt }, _isUndefined);
};

export const certToJSON = (cert) => {
  if (!cert) {
    return null;
  }
  const images = (cert.get('images') || []).map(fileToJSON);
  const owner = cert.get('owner');
  const createdAt = cert.get('createdAt').getTime();
  const updatedAt = cert.get('updatedAt').getTime();
  return _omitBy({ ...cert.toJSON(), images, owner: userToJSON(owner), createdAt, updatedAt }, _isUndefined);
};

export const shopProductToJSON = (product) => {
  if (!product) {
    return null;
  }
  const avCategory = product.get('category');
  const category = avCategory ? { ...avCategory.toJSON(), catalog: avCategory.get('catalog') ? avCategory.get('catalog').toJSON() : undefined } : null;

  const avSpecies = product.get('species');
  const species = avSpecies ? { ...avSpecies.toJSON(), category } : null;

  const avImages = product.get('images');
  const images = avImages ? avImages.map(fileToJSON) : [];

  const specs = product.get('specs') || null;

  const avShop = product.get('shop');
  const shop = avShop ? shopToJSON(avShop) : null;

  const avThumbnail = product.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = product.get('labels') || null;

  const createdAt = product.get('createdAt').getTime();
  const updatedAt = product.get('updatedAt').getTime();

  return _omitBy({
    ...product.toJSON(),
    category,
    species,
    specs,
    images,
    shop,
    thumbnail,
    labels,
    updatedAt,
    createdAt,
  }, _isUndefined);
};

export const supplyProductToJSON = (product) => {
  if (!product) {
    return null;
  }
  const avCategory = product.get('category');
  const category = avCategory ? { ...avCategory.toJSON(), catalog: avCategory.get('catalog') ? avCategory.get('catalog').toJSON() : undefined } : null;

  const avSpecies = product.get('species');
  const species = avSpecies ? { ...avSpecies.toJSON(), category } : null;

  const address = product.get('address') || null;

  const lnglat = product.get('lnglat').toJSON() || null;

  const avImages = product.get('images');
  const images = avImages ? avImages.map(fileToJSON) : [];

  const specs = product.get('specs') || null;

  const avOwner = product.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avThumbnail = product.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = product.get('labels') || null;

  const createdAt = product.get('createdAt').getTime();
  const updatedAt = product.get('updatedAt').getTime();

  return _omitBy({
    ...product.toJSON(),
    category,
    species,
    location: { address, lnglat },
    specs,
    images,
    owner,
    thumbnail,
    labels,
    updatedAt,
    createdAt,
  }, _isUndefined);
};

export const logisticsToJSON = (logistics) => {
  if (!logistics) {
    return null;
  }
  const address = logistics.get('address') || null;

  const lnglat = logistics.get('lnglat').toJSON() || null;

  const avOwner = logistics.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avImages = logistics.get('images');
  const images = avImages ? avImages.map(fileToJSON) : [];

  const avThumbnail = logistics.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = logistics.get('labels') || null;

  const createdAt = logistics.get('createdAt').getTime();
  const updatedAt = logistics.get('updatedAt').getTime();

  return _omitBy({
    ...logistics.toJSON(),
    location: { address, lnglat },
    images,
    owner,
    thumbnail,
    labels,
    updatedAt,
    createdAt,
  }, _isUndefined);
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

export const shopToJSON = (shop) => {
  if (!shop) {
    return null;
  }
  const address = shop.get('address') || null;

  const lnglat = shop.get('lnglat').toJSON() || null;

  const areas = shop.get('areas') || null;

  const avImages = shop.get('images');
  const images = avImages ? avImages.map(fileToJSON) : [];

  const avOwner = shop.get('owner');
  const owner = avOwner ? userToJSON(avOwner) : null;

  const createdAt = shop.get('createdAt').getTime();
  const updatedAt = shop.get('updatedAt').getTime();

  return _omitBy({
    ...shop.toJSON(),
    location: { address, lnglat },
    areas,
    images,
    owner,
    updatedAt,
    createdAt,
  }, _isUndefined);
};
