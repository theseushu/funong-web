export const fileToJSON = (file) => ({ ...file.toJSON(), metaData: file.get('metaData') });
