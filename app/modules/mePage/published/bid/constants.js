import { setBids } from 'modules/data/ducks/actions';
import { currentUserSelector, createUserBidsSelector } from 'modules/data/ducks/selectors';

const type = 'bid';

export const path = type;
export const name = 'me_bids_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = 'pageBids';
export const setData = ({ results }) => setBids(results);

export const selector = (state) => {
  const user = currentUserSelector(state);
  return { bids: createUserBidsSelector(user.objectId)(state) };
};

export const editPath = type;
