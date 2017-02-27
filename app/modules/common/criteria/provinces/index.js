import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import { provinces } from 'appConstants';
import moduleStyles from '../styles';

const CriteriaProvinces = ({ classes, selected, onSelect, onClear }) => (
  <div className={classes.line}>
    <div className={classes.title}>
      <strong>地区：</strong>
    </div>
    <div className={classes.content}>
      <Link
        to={'/supplies'}
        onClick={(e) => {
          e.preventDefault();
          onClear();
        }}
      ><LabelWithBorder accent={selected.length === 0}>不限</LabelWithBorder></Link>
      {provinces.map((p, i) =>
        <Link
          key={i}
          onClick={(e) => {
            e.preventDefault();
            onSelect(p.value);
          }}
          to={`/supplies?provinces=${p.value}`}
        ><LabelWithBorder accent={selected.indexOf(p.value) >= 0}>{p.title}</LabelWithBorder></Link>
      )}
    </div>
  </div>
);
CriteriaProvinces.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default injectSheet(moduleStyles)(CriteriaProvinces);
