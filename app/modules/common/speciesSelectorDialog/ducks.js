import { createSelector } from 'reselect';

import { catalogTypesSelector, catalogsSelector } from '../../data/ducks/selectors';

const SELECT_CATALOG_TYPE = 'speciesSelectorDialog/select_catalog_type';
const SELECT_CATALOG = 'speciesSelectorDialog/select_catalog';
const SELECT_CATEGORY = 'speciesSelectorDialog/select_category';
const CLEAR_SELECTION = 'speciesSelectorDialog/clear_selection';

export default {
  speciesSelectorDialog: (state = {}, action) => {
    if (action.type === SELECT_CATALOG_TYPE) {
      return { catalogType: action.payload.catalogType };
    } else if (action.type === SELECT_CATALOG) {
      return { catalogType: state.catalogType, catalog: action.payload.catalog };
    } else if (action.type === SELECT_CATEGORY) {
      return { catalogType: state.catalogType, catalog: state.catalog, category: action.payload.category };
    } else if (action.type === CLEAR_SELECTION) {
      return {};
    }
    return state;
  },
};

export const actions = {
  selectCatalogType: (catalogType) => ({ type: SELECT_CATALOG_TYPE, payload: { catalogType: catalogType.objectId } }),
  selectCatalog: (catalog) => ({ type: SELECT_CATALOG, payload: { catalog: catalog.objectId } }),
  selectCategory: (category) => ({ type: SELECT_CATEGORY, payload: { category: category.objectId } }),
  clearSelection: () => ({ type: CLEAR_SELECTION }),
}

export const selector = (dialogStateSelector) => createSelector(
  [catalogTypesSelector, catalogsSelector, dialogStateSelector],
  (catalogTypes, catalogs, state) => ({
    catalogType: catalogTypes[state.catalogType],
    catalog: catalogs[state.catalog],
  })
)
