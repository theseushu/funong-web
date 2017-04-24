/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import _reduce from 'lodash/reduce';
import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routes } from 'funong-common/lib/appConstants';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import api from 'api/ducks';
import data from 'modules/data/ducks';
import fullScreenGallery from 'modules/fullScreenGallery/ducks';
import mapDialog from 'modules/mapDialog/ducks';
import publishSelector from 'modules/publishSelector/ducks';

const dummyReducer = (state = {}) => state;
const routeReducers = _reduce(routes, (result, route, name) => ({ ...result, [name]: dummyReducer }), {});
/**
 * Creates the main reducer with the asynchronously loaded ones
 * Any async reducer shall have a dummy reducer here to initiate store with specific key
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    form: dummyReducer, // dummy reducer to create store with slice 'form'
    language: languageProviderReducer,
    toastr: toastrReducer,
    ...api,
    ...data,
    ...fullScreenGallery,
    ...mapDialog,
    ...publishSelector,
    ...routeReducers,
    ...asyncReducers,
  });
}
