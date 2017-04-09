import _find from 'lodash/find';
import { setInquiries } from 'modules/data/ducks/actions';
import { inquiriesSelector } from 'modules/data/ducks/selectors';

const type = 'inquiry';

export const path = type;
export const name = 'me_inquiries_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = 'pageInquiries';
export const setData = (results) => setInquiries(results);
export const selectFromData = (state, ids) => {
  const results = inquiriesSelector(state);
  return ids.map((id) => _find(results, (r) => r.objectId === id));
};

export const editPath = type;
