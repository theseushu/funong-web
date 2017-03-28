import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';


const NoResult = ({ classes, title }) => (
  <div className={classes.noResult}>
    <Icon name="sentiment_dissatisfied" />
    <span>{title || '没有结果，请更换查询条件'}</span>
  </div>
);

NoResult.propTypes = {
  title: PropTypes.string,
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
