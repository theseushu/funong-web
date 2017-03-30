import { SLICE_NAME, apiName, setData } from './constants';
import createDucks from '../utils/createDucks';

module.exports = createDucks(SLICE_NAME, apiName, setData);
