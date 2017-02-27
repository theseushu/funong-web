import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { categoriesSelector, speciesSelector } from 'modules/data/ducks/selectors';
import Category from './category';
import Species from './species';
import Provinces from './provinces';

const Criteria = ({ setCriteria, catalogGroups, category, species = [], provinces = [], sort, disabled = [], classes }) => {
  return (
    <div className={classes.wrapper}>
      <Category
        catalogGroups={catalogGroups}
        selected={category}
        onSelect={(c) => {
          setCriteria(_omitBy({ category: c, species: null, provinces, sort }, _isUndefined));
        }}
      >{category}</Category>
      { category && (
        <Species
          category={category}
          selected={species}
          onSelect={({ objectId }) => {
            if (species.indexOf(objectId) >= 0) {
              setCriteria(_omitBy({ category, species: _without(species, objectId), provinces, sort }, _isUndefined));
            } else {
              setCriteria(_omitBy({ category, species: [...species, objectId], provinces, sort }, _isUndefined));
            }
          }}
          onClear={() => {
            setCriteria(_omitBy({ category, provinces, sort }, _isUndefined));
          }}
        />)
      }
      {disabled.indexOf('provinces') < 0 && <Provinces provinces={provinces} />}
      <div>{sort}</div>
    </div>
  );
}

Criteria.propTypes = {
  classes: PropTypes.object.isRequired,
  setCriteria: PropTypes.func.isRequired,
  catalogGroups: PropTypes.array.isRequired,
  category: PropTypes.object,
  species: PropTypes.array,
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
  (state, { category }) => ({ // convert id to real object
    category: _find(categoriesSelector(state), (c) => c.objectId === category),
  }),
)(Criteria));
