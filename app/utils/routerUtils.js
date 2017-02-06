import { currentUserSelector } from '../modules/data/ducks/selectors';
import { actions } from '../api/profile';

const fetchProfile = actions.fetch;

export const ensureProfile = async (store) => {
  const currentUser = currentUserSelector(store.getState());
  // if currentUser's not been fetched, fetch it before continue
  // if it's fetched already, don't wait for the result
  if (currentUser) {
    store.dispatch(fetchProfile({}));
  } else {
    await new Promise((resolve, reject) => {
      store.dispatch(fetchProfile({
        meta: {
          resolve,
          reject,
        },
      }));
    });
  }
  return currentUserSelector(store.getState());
};
