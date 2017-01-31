export const fileToJSON = (file) => ({ ...file.toJSON(), metaData: file.get('metaData') });

export const supplyProductToJSON = (product) => {
  const category = { ...product.get('category').toJSON(), catalog: product.get('category').get('catalog').toJSON() };
  const species = { ...product.get('species').toJSON(), category };
  const address = product.get('address');
  const lnglat = product.get('lnglat').toJSON();
  const desc = { ...product.get('desc'), images: product.get('desc').images.map((file) => file.toJSON()) };
  const specs = product.get('specs');
  const owner = product.get('owner').toJSON();
  const thumbnail = product.get('thumbnail').toJSON();
  const labels = product.get('labels');
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
