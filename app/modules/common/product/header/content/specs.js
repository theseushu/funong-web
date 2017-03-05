import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { breakpoints, colors } from 'modules/common/styles';
import LabelWithBorder from 'modules/common/label/labelWithBorder';

const Specs = ({ specs, specIndex, onClick, classes }) => (
  <div className={classes.wrapper}>
    <div className={classes.specs}>
      <h6>规格：</h6>
      <div className={classes.specNames}>
        {specs.length > 0 && specs.map((spec, i) => <Button key={i} ripple colored={specIndex === i} onClick={() => onClick(i)}>{spec.name}</Button>)}
      </div>
    </div>
    <div className={classes.params}>
      {specs[specIndex].params.map((param, i) => <LabelWithBorder key={i}>{param}</LabelWithBorder>)}
    </div>
    <p className={classes.price}>{`${specs[specIndex].minimum}${specs[specIndex].unit}以上 每${specs[specIndex].unit}${specs[specIndex].price}元`}</p>
  </div>
  );

Specs.propTypes = {
  specs: PropTypes.array.isRequired,
  specIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    marginBottom: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginBottom: 8,
    },
  },
  specs: {
    display: 'flex',
    alignItems: 'center',
    '& > h6': {
      color: 'inherit',
      fontSize: 16,
      lineHeight: '20px',
      margin: '0 16px 0 0',
    },
  },
  specNames: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  params: {
    padding: 8,
    '& > span': {
      margin: '0 4px',
    },
  },
  price: {
    color: colors.colorPrice,
    paddingLeft: 8,
  },
})(Specs);
