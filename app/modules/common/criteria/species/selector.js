import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import blockLoading from 'assets/blockLoading.gif';
import { Label } from 'modules/common/species';
import moduleStyles from '../styles';

class SpeciesSelector extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    speciesArray: PropTypes.array.isRequired,
    pending: PropTypes.bool,
    selected: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
  }
  render() {
    const { classes, speciesArray, pending, selected, onSelect, onClear } = this.props;
    if (pending) {
      return (
        <div className={classes.line}>
          <img src={blockLoading} role="presentation" />
        </div>
      );
    }
    if (speciesArray.length === 0) {
      return null;
    }
    return (
      <div className={classes.line}>
        <div className={classes.title}>
          <strong>品种：</strong>
        </div>
        <div className={classes.content}>
          <Link
            to={'/supplies'}
            onClick={(e) => {
              e.preventDefault();
              onClear();
            }}
          >{selected.length === 0 ? <Label species={{ name: '不限' }} /> : <LabelWithBorder>不限</LabelWithBorder>}</Link>
          {speciesArray.map((s, i) =>
            <Link
              key={i}
              onClick={(e) => {
                e.preventDefault();
                onSelect(s);
              }}
              to={`/supplies?category=${s.category.objectId}&species=${s.objectId}`}
            >{(selected.indexOf(s.objectId) >= 0) ? <Label species={s} /> : <LabelWithBorder>{s.name}</LabelWithBorder>}</Link>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(moduleStyles)(SpeciesSelector);
