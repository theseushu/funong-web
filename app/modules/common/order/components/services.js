import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _find from 'lodash/find';
import Checkbox from 'react-mdl/lib/Checkbox';
import styles, { breakpoints, colors } from 'modules/common/styles';
import { productTypes, serviceTypes, orderFeeTypes } from 'appConstants';
import { isOwner as isOrderOwner } from 'utils/orderUtils';
import { layouts } from '../styles';
import FeeDialog from './feeDialog';

class Services extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onServiceChange: PropTypes.func,
    onServiceFeeChange: PropTypes.func,
  }
  state = { editing: false }
  servicesEditable = () => {
    const { order: { type, services, shop, user }, onServiceChange, classes } = this.props;
    let availableServices;
    if (type === productTypes.shop) {
      availableServices = shop.services || [];
    } else {
      availableServices = user.services[type] || [];
    }
    // there's no available service to chose
    if (availableServices.length === 0) {
      return null;
    }
    return (
      <div className="_left">
        <small className={styles.w100}>卖家提供以下服务</small>
        <div className={classes.checkboxes}>
          {
            availableServices.map(({ value, charge }, i) => {
              const service = _find(serviceTypes[type], (s) => s.value === value);
              const checked = !!_find(services, (s) => s.value === value);
              return (
                <div key={i}>
                  <Checkbox
                    label={service.title}
                    checked={checked}
                    onChange={(e) => {
                      let newServices = [...services];
                      if (e.target.checked) {
                        newServices = [{ value, charge }, ...newServices];
                      } else {
                        newServices = newServices.filter((s) => s.value !== value);
                      }
                      onServiceChange(newServices);
                    }}
                  />
                  { charge && <small className={styles.colorSubPrice}>(单独收费)</small>}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  servicesReadonly = (isOwner) => {
    const { order: { type, services }, classes } = this.props;
    if (services.length === 0) {
      return null;
    }
    return (
      <div className="_left">
        <small className={styles.w100}>{isOwner ? '卖家提供以下服务' : '买家选择了以下服务'}</small>
        <div className={classes.checkboxes}>
          {
            services.map(({ value, charge }, i) => {
              const service = _find(serviceTypes[type], (s) => s.value === value);
              if (!service) {
                console.warn('inconsistent data'); // eslint-disable-line
                return null;
              }
              return (
                <div key={i}>
                  {service.title}
                  { charge && <small className={styles.colorSubPrice}>(单独收费)</small>}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  feeReadonly = (isOwner) => {
    const { order: { services, fees } } = this.props;
    if (services.length === 0) {
      return null;
    }
    const fee = fees[orderFeeTypes.service.key];
    return (
      <div className="_right">
        <div className="_info">
          <small className={styles.colorSubTitle}>{isOwner ? '您选择了单独收费的服务' : '买家选择了单独收费的服务'}</small>
        </div>
        <div className="_amount">
          <small>{orderFeeTypes.service.title}：</small>
          <span>
            { fee !== -1 ? `￥${fee}` : '待议' }
          </span>
        </div>
      </div>
    );
  }
  feeEditable = (isOwner) => {
    const { order: { services, fees }, onServiceFeeChange } = this.props;
    if (services.length === 0) {
      return null;
    }
    const fee = fees[orderFeeTypes.service.key];
    const { editing } = this.state;
    return (
      <div className="_right">
        <div className="_info">
          {
            isOwner ? (
              <small className={styles.colorSubTitle}>
                您选择了单独收费的额外服务，请与卖家商议附加费用<br />您也可以直接提交订单，卖家稍候会确认订单总价
              </small>
            ) : (
              <small className={styles.colorSubTitle}>
                买家选择了单独收费的额外服务<br />请确认服务费用
              </small>
            )
          }
        </div>
        <div className="_amount">
          <small>{orderFeeTypes.service.title}：</small>
          <span>
            { fee !== -1 ? `￥${fee}` : '待议' }
            <br className="_line_breaker" />
            <small>
              <a href="#_non_existing" onClick={(e) => { e.preventDefault(); this.setState({ editing: true }); }}>
                { isOwner && (fee !== -1 ? ' 修改' : ' 已经商议过了？') }
                { !isOwner && (fee !== -1 ? ' 修改' : ' 确定服务费') }
              </a>
            </small>
          </span>
          { editing && (
            <FeeDialog
              title={orderFeeTypes.service.title}
              close={() => this.setState({ editing: false })}
              value={fee === -1 ? null : fee}
              onSubmit={onServiceFeeChange}
            />
          )}
        </div>
      </div>
    );
  }
  render() {
    const { user, order, classes } = this.props;
    const { can } = order;
    const isOwner = isOrderOwner(order, user);
    const editable = can.service && can.service.fee === -1;
    return (
      <div className={classes.services}>
        { can.requirements ? this.servicesEditable() : this.servicesReadonly(isOwner)}
        {
          editable ? this.feeEditable(isOwner) : this.feeReadonly(isOwner)
        }
      </div>
    );
  }
}

export default injectSheet({
  services: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    color: colors.colorSubTitle,
    '& > ._left': {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& > ._right': {
      width: layouts.right,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& ._info': {
      flex: 1,
      paddingRight: 16,
    },
    '& ._amount': {
      color: colors.colorSubPrice,
      width: layouts.priceColumnWidth,
      '& a': {
        textDecoration: 'none',
      },
    },
    '& small': {
      color: colors.colorSubTitle,
    },
    [breakpoints.mediaDestkopBelow]: {
      flexDirection: 'column',
      '& > ._right': {
        width: '100%',
        flexDirection: 'column',
      },
      '& ._amount': {
        width: '100%',
      },
      '& ._line_breaker': {
        display: 'none',
      },
    },
  },
  checkboxes: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
      '& > .mdl-checkbox': {
        width: 'auto',
      },
    },
  },
})(Services);
