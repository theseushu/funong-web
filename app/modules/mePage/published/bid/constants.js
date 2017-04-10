import _find from 'lodash/find';
import { setBids } from 'modules/data/ducks/actions';
import { currentUserSelector, bidsSelector } from 'modules/data/ducks/selectors';

const type = 'bid';

export const path = type;
export const name = 'me_bids_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = 'pageBids';
export const setData = (bids) => setBids(bids);
export const selectFromData = (state, ids) => {
  const entries = bidsSelector(state);
  return ids.map((id) => _find(entries, (p) => p.objectId === id));
};

export const editPath = type;
