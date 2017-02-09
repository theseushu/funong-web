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

export const userToJSON = (user) => {
  const avAvatar = user.get('avatar');
  const avatar = avAvatar ? fileToJSON(avAvatar) : undefined;
  const images = (user.get('images') || []).map(fileToJSON);
  return { ...user.toJSON(), avatar, images };
};

export const certToJSON = (cert) => {
  const images = (cert.get('images') || []).map(fileToJSON);
  return { ...cert.toJSON(), images };
};

export const supplyProductToJSON = (product) => {
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

  return {
    ...product.toJSON(),
    category,
    species,
    location: { address, lnglat },
    specs,
    images,
    owner,
    thumbnail,
    labels,
    updatedAt: product.getUpdatedAt().getTime(),
    createdAt: product.getCreatedAt().getTime(),
  };
};

export const logisticsToJSON = (logistics) => {
  const address = logistics.get('address') || null;

  const lnglat = logistics.get('lnglat').toJSON() || null;

  const avOwner = logistics.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avImages = logistics.get('images');
  const images = avImages ? avImages.map(fileToJSON) : [];

  const avThumbnail = logistics.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = logistics.get('labels') || null;

  return {
    ...logistics.toJSON(),
    location: { address, lnglat },
    images,
    owner,
    thumbnail,
    labels,
    updatedAt: logistics.getUpdatedAt().getTime(),
    createdAt: logistics.getCreatedAt().getTime(),
  };
};

export const cartItemToJSON = (cartItem) => {
  // TODO shop
  // const avShop = cartItem.get('shop');
  const avSupply = cartItem.get('supplyProduct');
  const supplyProduct = avSupply ? supplyProductToJSON(avSupply) : null;
  const avShop = cartItem.get('shopProduct');
  const shopProduct = avShop ? supplyProductToJSON(avSupply) : null;
  const avOwner = cartItem.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  return { ...cartItem.toJSON(), owner, supplyProduct, shopProduct };
};
