export const fileToJSON = (file) => ({ ...file.toJSON(), metaData: file.get('metaData') });

export const supplyProductToJSON = (product) => {
  const avCategory = product.get('category');
  const category = avCategory ? { ...avCategory.toJSON(), catalog: avCategory.get('catalog').toJSON() } : null;

  const avSpecies = product.get('species');
  const species = avSpecies ? { ...avSpecies.toJSON(), category } : null;

  const address = product.get('address') || null;

  const lnglat = product.get('lnglat').toJSON() || null;

  const avDesc = product.get('desc');
  const desc = avDesc ? { ...avDesc, images: avDesc.images ? avDesc.images.map((file) => file.toJSON()) : [] } : null;

  const specs = product.get('specs') || null;

  const avOwner = product.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avThumbnail = product.get('thumbnail');
  const thumbnail = avThumbnail ? avThumbnail.toJSON() : null;

  const labels = product.get('labels') || null;

  return {
    ...product.toJSON(),
    category,
    species,
    location: { address, lnglat },
    specs,
    desc,
    owner,
    thumbnail,
    labels,
  };
};
