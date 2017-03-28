import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { categoriesSelector } from 'modules/data/ducks/selectors';
import Category from './category';
import Species from './species';
import Provinces from './provinces';
import SortAndpaging from './sortAndpaging';

const Criteria = ({ setCriteria, catalogGroups, category, species = [], provinces = [], sort, sorts, disabled = [], page, pageSize, result, classes }) => {
  const criteria = { category, species, provinces, sort, page, pageSize };
  return (
    <div className={classes.wrapper}>
      { disabled.indexOf('category') < 0 &&
        <Category
          catalogGroups={catalogGroups}
          selected={category}
          onSelect={(c) => {
            setCriteria(_omitBy({ ...criteria, category: c }, _isUndefined));
          }}
        >{category}</Category>
      }
      { disabled.indexOf('category') < 0 && category && (
        <Species
          category={category}
          selected={species}
          onSelect={({ objectId }) => {
            if (species.indexOf(objectId) >= 0) {
              setCriteria(_omitBy({ ...criteria, species: _without(species, objectId) }, _isUndefined));
            } else {
              setCriteria(_omitBy({ ...criteria, species: [...species, objectId] }, _isUndefined));
            }
          }}
          onClear={() => {
            setCriteria(_omitBy({ ...criteria, species: undefined }, _isUndefined));
          }}
        />)
      }
      { disabled.indexOf('provinces') < 0 && (
        <Provinces
          selected={provinces}
          onSelect={(province) => {
            if (provinces.indexOf(province) >= 0) {
              setCriteria(_omitBy({ ...criteria, provinces: _without(provinces, province) }, _isUndefined));
            } else {
              setCriteria(_omitBy({ ...criteria, provinces: [...provinces, province] }, _isUndefined));
            }
          }}
          onClear={() => {
            setCriteria(_omitBy({ ...criteria, provinces: undefined }, _isUndefined));
          }}
        />)
      }
      { disabled.indexOf('sort') < 0 && (
        <SortAndpaging
          selected={sort}
          page={page}
          pageSize={pageSize}
          result={result}
          sorts={sorts}
          onSelect={(s) => {
            setCriteria(_omitBy({ ...criteria, sort: s }, _isUndefined));
          }}
          onClear={() => {
            setCriteria(_omitBy({ ...criteria, sort: undefined }, _isUndefined));
          }}
          onPageSelected={(p) => {
            setCriteria(_omitBy({ ...criteria, page: p }, _isUndefined));
          }}
        />)
      }
    </div>
  );
};

Criteria.propTypes = {
  classes: PropTypes.object.isRequired,
  setCriteria: PropTypes.func.isRequired,
  catalogGroups: PropTypes.array.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  category: PropTypes.object,
  species: PropTypes.array,
  provinces: PropTypes.array,
  sort: PropTypes.object,
  sorts: PropTypes.object, // available sort attributes. see ./sorts.js
  disabled: PropTypes.array,
  result: PropTypes.object,
};

export default injectSheet({
  wrapper: {
    width: '100%',
    position: 'relative',
    zIndex: 1000,
  },
})(connect(
  (state, { category }) => ({ // convert id to real object
    category: _find(categoriesSelector(state), (c) => c.objectId === category),
  }),
)(Criteria));
