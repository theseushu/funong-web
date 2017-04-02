import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';


const NoResult = ({ title, icon, classes }) => (
  <div className={classes.noResult}>
    <Icon name={icon} />
    <span>{title}</span>
  </div>
);

NoResult.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  noResult: {
    width: '100%',
    color: colors.colorSubTitle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '24px 0',
    '& > i': {
      fontSize: '4em',
    },
    '& > span': {
      marginLeft: '1em',
    },
    [breakpoints.mediaDestkopBelow]: {
      flexDirection: 'column',
      '& > span': {
        marginLeft: 0,
        marginTop: '1em',
      },
    },
  },
})(NoResult);
