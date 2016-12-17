import { createSelector } from 'reselect';
const rootSelector = (state) => state.data;

export const currentUserSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { users = [] }, currentUser = '' } = data;
    const user = users && users[currentUser];
    return user;
  }
);

export const catalogTypesSelector = createSelector(
  rootSelector,
  (data) => {
    let { entities: { catalogTypes = [] } } = data;
    return catalogTypes;
  }
);

