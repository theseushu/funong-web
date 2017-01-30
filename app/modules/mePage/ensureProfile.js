import { currentUserSelector } from '../data/ducks/selectors';
import { fetchProfile } from '../api/fetchProfile';
import { createProfile } from '../api/createProfile';

export default async (store) => {
  const currentUser = currentUserSelector(store.getState());
  if (currentUser) {
    // if currentUser.profile is null, create one before continue
    if (!currentUser.profile) {
      await new Promise((resolve, reject) => {
        store.dispatch(createProfile({ type: '一般用户', meta: { resolve, reject } }));
      });
      return currentUserSelector(store.getState());
    }
    return currentUser;
  }
  // if currentUser's not been fetched, fetch it before continue
  // if currentUser.profile is null, create one before continue
  await new Promise((resolve, reject) => {
    store.dispatch(fetchProfile({
      meta: {
        resolve: (user) => {
          if (!user.profile) {
            store.dispatch(createProfile({ type: '一般用户', meta: { resolve, reject } }));
          } else {
            resolve();
          }
        },
        reject,
      },
    }));
  });
  return currentUserSelector(store.getState());
};
