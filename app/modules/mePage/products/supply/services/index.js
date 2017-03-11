import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { serviceTypes } from 'appConstants';
import { colors } from 'modules/common/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/profile';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Service from './service';

const updateProfile = actions.update;
const selector = selectors.update;

const Services = ({ user: { services }, updateServices, classes }) => (
  <Grid noSpacing className={classes.grid}>
    <Cell col={12} tablet={8} phone={4}>
      <h6>提供服务：</h6>
    </Cell>
    {_map(serviceTypes, ({ value, title }, key) => {
      const userService = _find(services, (s) => s.value === value);
      return (
        <Cell key={key}>
          <Service value={value} title={title} checked={!!userService} charge={!userService ? false : userService.charge} onChange={updateServices} />
        </Cell>
      );
    })}
  </Grid>
);

Services.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateServices: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ user: currentUserSelector(state), ...selector(state) }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    updateServices: (value, checked, charge) => {
      let services = [...stateProps.user.services];
      if (checked) {
        services = _filter(services, (service) => service.value !== value);
        services.push({ value, charge });
      } else {
        services = _filter(services, (service) => service.value !== value);
      }
      return dispatchProps.updateProfile({ services });
    },
    ...ownProps,
  })
)(injectSheet({
  grid: {
    color: colors.colorSubTitle,
  },
})(Services));
