import _isUndefined from 'lodash/isUndefined';
import fileToJSON from './file';

export default (images) => images ? images.map(fileToJSON).filter((f) => !_isUndefined(f)) : undefined;
