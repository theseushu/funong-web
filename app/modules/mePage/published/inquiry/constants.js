import { setInquiries } from 'modules/data/ducks/actions';
import { currentUserSelector, createUserInquiriesSelector } from 'modules/data/ducks/selectors';

const type = 'inquiry';

export const path = type;
export const name = 'me_inquiries_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = 'pageInquiries';
export const setData = ({ results }) => setInquiries(results);

export const selector = (state) => {
  const user = currentUserSelector(state);
  return { inquiries: createUserInquiriesSelector(user.objectId)(state) };
};

export const editPath = type;
