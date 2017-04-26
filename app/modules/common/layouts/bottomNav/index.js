import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';
import { actions, selectors } from 'modules/context/ducks';
import { findRoutes } from '../utils';

const BottomNav = ({ classes, site, setSite }, { router }) => (
  <div className={`${classes.bottomNav}`}>
    {findRoutes(site).map((route, i) => (
      <Button
        key={i}
        ripple
        accent={router.isActive(route.path)}
        onClick={() => {
          if (route.switch) {
            setSite(route.switch);
          }
          router.push(route.path);
        }}
      >
        <div>
          <Icon name={route.icon} />
          <span>{route.title}</span>
        </div>
      </Button>
    ))}
  </div>
);

BottomNav.contextTypes = {
  router: PropTypes.object.isRequired,
};
BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  site: PropTypes.shape({
    main: PropTypes.bool,
    farm: PropTypes.bool,
  }).isRequired,
  setSite: PropTypes.func.isRequired,
};

export default injectSheet({
  bottomNav: {
    zIndex: 6,
    position: 'fixed',
    width: '100%',
    height: 56,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: colors.colorSubTitle,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; border-radius: 2px',
    [breakpoints.mediaTabletAbove]: {
      display: 'none',
    },
    '& .mdl-button': {
      color: colors.colorSubTitle,
    },
    '& .mdl-button.mdl-button--accent': {
      color: colors.colorAccent,
    },
    '& > button': {
      flex: 1,
      height: 56,
      minWidth: 64,
      maxWidth: 168,
      padding: '6px 0 10px',
      '& > div': {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        '& > span': {
          fontSize: '14px',
          lineHeight: '16px',
        },
      },
    },
  },
})(connect(
  (state) => ({ site: selectors.site(state) }),
  (dispatch) => bindActionCreators({ setSite: actions.setSite }, dispatch),
)(BottomNav));
