import _find from 'lodash/find';
import { routes } from 'funong-common/lib/appConstants';
import { setBids } from 'modules/data/ducks/actions';
import { bidsSelector } from 'modules/data/ducks/selectors';

const type = 'bid';

export const path = routes.page_my_bids;
export const name = 'page_my_bids';
export const SLICE_NAME = name;
export const apiName = 'pageBids';
export const setData = (bids) => setBids(bids);
export const selectFromData = (state, ids) => {
  const entries = bidsSelector(state);
  return ids.map((id) => _find(entries, (p) => p.objectId === id));
};

export const editPath = type;
