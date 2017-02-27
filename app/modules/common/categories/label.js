import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Label from 'modules/common/label';
import { colors } from 'modules/common/styles';

const CategoryLabel = ({ classes, category }) => category ? <Label className={classes.label}>{category.name}</Label> : null;

CategoryLabel.propTypes = {
  category: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  label: {
    background: colors.colorCategoryLabel,
  },
})(CategoryLabel);
