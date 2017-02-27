import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { categoriesSelector, speciesSelector } from 'modules/data/ducks/selectors';
import Category from './category';
import Species from './species';
import Provinces from './provinces';

const Criteria = ({ setCriteria, catalogGroups, category, species, provinces, sort, disabled = [], classes }) => (
  <div className={classes.wrapper}>
    <Category
      catalogGroups={catalogGroups}
      category={category}
      species={species}
      onSelect={(c) => {
        setCriteria(_omitBy({ category: c, species: null, provinces, sort }, _isUndefined));
      }}
    >{category}</Category>
    { category && <Species category={category} species={species} /> }
    {disabled.indexOf('provinces') < 0 && <Provinces provinces={provinces} />}
    <div>{sort}</div>
  </div>
);

Criteria.propTypes = {
  classes: PropTypes.object.isRequired,
  setCriteria: PropTypes.func.isRequired,
  catalogGroups: PropTypes.array.isRequired,
  category: PropTypes.object,
  species: PropTypes.object,
  provinces: PropTypes.array,
  sort: PropTypes.string,
  disabled: PropTypes.array,
};

export default injectSheet({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
})(connect(
  (state, { category, species }) => ({
    category: _find(categoriesSelector(state), (c) => c.objectId === category),
    species: _find(speciesSelector(state), (s) => s.objectId === species),
  }),
)(Criteria));
