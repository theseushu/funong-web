import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import blockLoading from 'assets/blockLoading.gif';
import Label from '../label';

class SpeciesSelector extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    speciesArray: PropTypes.array.isRequired,
    pending: PropTypes.bool,
    species: PropTypes.object,
  }
  render() {
    const { classes, speciesArray, pending, species } = this.props;
    if (pending) {
      return (
        <div className={classes.species}>
          <img src={blockLoading} role="presentation" />
        </div>
      );
    }
    if (speciesArray.length === 0) {
      return null;
    }
    return (
      <div className={classes.species}>
        <div className={classes.title}>
          <strong>品种：</strong>
        </div>
        <div className={classes.content}>
          {speciesArray.map((s, i) =>
            <Link
              key={i}
              to={`/supplies?category=${s.category.objectId}&species=${s.objectId}`}
            >{(species && species.objectId === s.objectId) ? <Label species={s} /> : <LabelWithBorder>{s.name}</LabelWithBorder>}</Link>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet({
  species: {
    display: 'flex',
    margin: 16,
    '& a': {
      textDecoration: 'none',
    },
  },
  title: {
  },
  content: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    '& > a': {
      marginLeft: 16,
      marginBottom: 4,
    },
  },
})(SpeciesSelector);
