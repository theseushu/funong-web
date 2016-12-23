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

export const catalogsSelector = createSelector(
  rootSelector,
  (data) => {
    const { entities: { catalogs = {} } } = data;
    return Object.keys(catalogs);
  }
);
