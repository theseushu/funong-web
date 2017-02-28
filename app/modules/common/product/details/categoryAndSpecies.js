import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Label as CategoryLabel } from 'modules/common/categories';
import { Label as SpeciesLabel } from 'modules/common/species';

const CategoryAndSpecies = ({ category, species, classes }) => (
  <div className={classes.categoryAndSpecies}>
    <h6>分类</h6>
    <div className={classes.labels}>
      <CategoryLabel category={category} />
      <SpeciesLabel species={species} />
    </div>
  </div>
  );

CategoryAndSpecies.propTypes = {
  category: PropTypes.object.isRequired,
  species: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default injectSheet({
  categoryAndSpecies: {
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    '& > h6': {
      color: 'inherit',
      fontSize: 16,
      lineHeight: '20px',
      margin: '0 16px 0 0',
    },
  },
  labels: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      marginLeft: 16,
    },
  },
})(CategoryAndSpecies);
