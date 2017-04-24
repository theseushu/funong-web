import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { serviceTypes } from 'funong-common/lib/appConstants';
import { colors } from 'modules/common/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/profile';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Service from './service';

const updateProfile = actions.update;
const selector = selectors.update;

const Services = ({ user: { services }, updateServices, pending, classes }) => (
  <Grid noSpacing className={classes.grid}>
    <Cell col={12} tablet={8} phone={4}>
      <h6>提供服务：</h6>
    </Cell>
    {_map(serviceTypes.supply, ({ value, title }, key) => {
      const userService = _find(services.supply, (s) => s.value === value);
      return (
        <Cell key={key}>
          <Service value={value} title={title} pending={pending} checked={!!userService} charge={!userService ? false : userService.charge} onChange={updateServices} />
        </Cell>
      );
    })}
  </Grid>
);

Services.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  pending: PropTypes.bool,
  updateServices: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ user: currentUserSelector(state), ...selector(state) }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    updateServices: (value, checked, charge) => {
      const userServices = stateProps.user.services || {};
      const userSupplySerivces = userServices.supply || [];
      let supplyServices = [...userSupplySerivces];
      if (checked) {
        supplyServices = _filter(supplyServices, (service) => service.value !== value);
        supplyServices.push({ value, charge });
      } else {
        supplyServices = _filter(supplyServices, (service) => service.value !== value);
      }
      return dispatchProps.updateProfile({ services: { ...userServices, supply: supplyServices } });
    },
    ...ownProps,
  })
)(injectSheet({
  grid: {
    width: '100%',
    color: colors.colorSubTitle,
  },
})(Services));
