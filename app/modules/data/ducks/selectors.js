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
    return Object.values(catalogs);
  }
);

export const categoriesSelector = createSelector(
  rootSelector,
  (data) => data.entities.categories,
);

export const speciesSelector = createSelector(
  rootSelector,
  (data) => data.entities.species,
);
