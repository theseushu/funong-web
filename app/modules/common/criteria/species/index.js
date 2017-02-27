import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/species';
import { speciesSelector } from 'modules/data/ducks/selectors';
import Selector from './selector';

const fetchSpecies = actions.fetchSpecies;
const fetchSpeciesSelector = selectors.fetchSpecies;

export default connect(
  (state, { category }) => ({ ...fetchSpeciesSelector(state), speciesArray: speciesSelector(state).filter((s) => s.category.objectId === category.objectId) }),
  (dispatch) => bindActionCreators({ fetchSpecies }, dispatch),
)(Selector);
