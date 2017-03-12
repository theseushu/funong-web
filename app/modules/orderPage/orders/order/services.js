import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import _without from 'lodash/without';
import _filter from 'lodash/filter';
import Checkbox from 'react-mdl/lib/Checkbox';
import { serviceTypes } from 'appConstants';
import styles from 'modules/common/styles';
import AddtionalFeeDialog from './additionalFeeDialog';

class Serivces extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  state = { editing: false }
  onChange = ({ ...params }) => {
    const { onChange } = this.props;
    onChange({ ...params });
  }
  render() {
    const { order: { owner, shop, services, addtionalFee }, classes } = this.props;
    const editing = this.state.editing;
    const ownerServices = (owner && owner.services) || (shop && shop.services);
    const selectedServices = _filter(ownerServices, (service) => services.indexOf(service.value) > -1);
    const chargedService = !!_find(selectedServices, (service) => service.charge);
    return (
      <div className={`${classes.line} ${classes.services}`}>
        <div className="_left">
          <small className={styles.w100}>卖家提供以下服务</small>
          <div className={classes.checkboxes}>
            {
              owner.services.map(({ value, charge }, i) => {
                const serviceType = _find(serviceTypes, (type) => type.value === value);
                if (!serviceType) {
                  return null;
                }
                return (
                  <div key={i}>
                    <Checkbox
                      label={serviceType.title}
                      checked={services.indexOf(value) > -1}
                      onChange={(e) => {
                        let newServices = [...services];
                        if (e.target.checked) {
                          newServices = [value, ...newServices];
                        } else {
                          newServices = _without(newServices, value);
                        }
                        this.onChange({ services: newServices });
                      }}
                    />
                    { charge && <small className={styles.colorSubPrice}>(单独收费)</small>}
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="_right">
          <div className="_info">
            {chargedService && (<small className={styles.colorSubTitle}>您选择了单独收费的额外服务，请与卖家商议附加费用<br />您也可以直接提交订单，卖家稍候会确认订单总价</small>)}
          </div>
          <div className="_amount">
            {chargedService && (
              <div className="_amount">
                <small>费用：</small>
                <span>
                  { addtionalFee != null ? `￥${addtionalFee}` : '待议' }
                  <br />
                  <small>
                    <a href="#_non_existing" onClick={(e) => { e.preventDefault(); this.setState({ editing: true }); }}>
                      { addtionalFee ? '修改' : '已经商议过了？' }
                    </a>
                  </small>
                </span>
                { editing && (
                  <AddtionalFeeDialog
                    close={() => this.setState({ editing: false })}
                    value={addtionalFee}
                    onSubmit={(value) => this.onChange({ addtionalFee: value })}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Serivces;
