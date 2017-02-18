import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';

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

export const requireAuth = async (store) => {
  const result = { login: false };
  try {
    let currentUser = currentUserSelector(store.getState());
    // if currentUser's not been fetched, fetch it before continue
    // if it's fetched already, don't wait for the result
    if (!currentUser) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchProfile({ meta: { resolve, reject } }));
      });
    }
    currentUser = currentUserSelector(store.getState());
    if (currentUser) {
      result.login = true;
    }
    return result;
  } catch (err) {
    return result;
  }
};

// export const requireAdmin = async (store) => {
//   const result = { login: false, isAdmin: false };
//   try {
//     let currentUser = currentUserSelector(store.getState());
//     // if currentUser's not been fetched, fetch it before continue
//     // if it's fetched already, don't wait for the result
//     if (!currentUser) {
//       await new Promise((resolve, reject) => {
//         store.dispatch(fetchProfile({ meta: { resolve, reject } }));
//       });
//     }
//     currentUser = currentUserSelector(store.getState());
//     if (currentUser) {
//       result.login = true;
//     } else {
//       return result;
//     }
//     if (currentUser.roles.indexOf('super') >= 0 || currentUser.roles.indexOf('admin') >= 0) {
//       result.isAdmin = true;
//       return result;
//     }
//     const { fulfilled } = fetchUserRolesSelector(store.getState());
//     if (!fulfilled) {
//       await new Promise((resolve, reject) => {
//         store.dispatch(fetchUserRoles({ meta: { resolve, reject } }));
//       });
//     }
//     const { roles } = fetchUserRolesSelector(store.getState());
//     if (roles.indexOf('admin') > -1 || roles.indexOf('super') > -1) {
//       result.isAdmin = true;
//     }
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };
