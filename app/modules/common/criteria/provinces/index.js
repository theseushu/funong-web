import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import blockLoading from 'assets/blockLoading.gif';
import { provinces } from 'appConstants';
import moduleStyles from '../styles';

class SpeciesSelector extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.line}>
        <div className={classes.title}>
          <strong>地区：</strong>
        </div>
        <div className={classes.content}>
          {provinces.map((p, i) =>
            <Link
              key={i}
              to={`/supplies?provinces=${p.value}`}
            ><LabelWithBorder>{p.title}</LabelWithBorder></Link>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(moduleStyles)(SpeciesSelector);
