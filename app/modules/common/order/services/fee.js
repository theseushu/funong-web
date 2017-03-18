import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import styles from 'modules/common/styles';
import { orderFeeTypes } from 'appConstants';
import AddtionalFeeDialog from '../components/additionalFeeDialog';
import ServicesPart from './services';

class Serivces extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired,
    serviceFee: PropTypes.number,
    onServiceFeeChange: PropTypes.func,
  }
  state = { editing: false }
  render() {
    const { services, serviceFee, onServiceFeeChange } = this.props;
    const editing = this.state.editing;
    // there's no available service to chose
    const charged = _find(services, ({ charge, checked }) => checked && charge);
    return (
      <div className="_right">
        <div className="_info">
          {charged && (<small className={styles.colorSubTitle}>您选择了单独收费的额外服务，请与卖家商议附加费用<br />您也可以直接提交订单，卖家稍候会确认订单总价</small>)}
        </div>
        <div className="_amount">
          {charged && (
            <div className="_amount">
              <small>{orderFeeTypes.service.title}：</small>
              <span>
                { serviceFee != null ? `￥${serviceFee}` : '待议' }
                <br />
                { onServiceFeeChange != null && (
                  <small>
                    <a href="#_non_existing" onClick={(e) => { e.preventDefault(); this.setState({ editing: true }); }}>
                      { serviceFee != null ? '修改' : '已经商议过了？' }
                    </a>
                  </small>
                )}
              </span>
              { editing && (
                <AddtionalFeeDialog
                  title={orderFeeTypes.service.title}
                  close={() => this.setState({ editing: false })}
                  value={serviceFee}
                  onSubmit={onServiceFeeChange}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Serivces;
