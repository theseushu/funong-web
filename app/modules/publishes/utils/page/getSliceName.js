import { publishTypesInfo } from 'funong-common/lib/appConstants';

export default (key) => `page_${publishTypesInfo[key].route}`;
