import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import { provinces } from 'appConstants';
import moduleStyles from '../styles';

const CriteriaProvinces = ({ classes }) => (
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
CriteriaProvinces.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(CriteriaProvinces);
