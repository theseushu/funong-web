import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Label from 'modules/common/label';
import { colors } from 'modules/common/styles';

const SpeciesLabel = ({ classes, species }) => species ? <Label className={classes.label}>{species.name}</Label> : null;

SpeciesLabel.propTypes = {
  species: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  label: {
    background: colors.colorSpeciesLabel,
  },
})(SpeciesLabel);
