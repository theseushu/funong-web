import { currentUserSelector, myShopSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';
import { actions as shopActions } from 'api/shop';

const fetchProfile = actions.fetch;
const fetchMyShop = shopActions.fetchMine;

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

export const requireShop = async (store) => {
  const result = await requireAuth(store);
  if (!result.login) {
    return { login: false, shop: false };
  }
  try {
    let shop = myShopSelector(store.getState());
    // if currentUser's not been fetched, fetch it before continue
    // if it's fetched already, don't wait for the result
    if (!shop) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchMyShop({ meta: { resolve, reject } }));
      });
    }
    shop = myShopSelector(store.getState());
    if (shop) {
      return { login: true, shop: true };
    }
    return { login: true, shop: false };
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
