import { connect } from 'react-redux';
import { currentUserSelector, createUserProductsSelector } from 'modules/data/ducks/selectors';
import type, { editPath, Card } from './constants';
import createPage from '../utils/createPage';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: createUserProductsSelector(type, user.objectId)(state) };
  }
)(createPage(editPath, Card));
