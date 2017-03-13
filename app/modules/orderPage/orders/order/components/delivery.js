import React, { Component, PropTypes } from 'react';
import { calculateDelivery } from 'utils/orderUtils';
import styles from 'modules/common/styles';
import AddtionalFeeDialog from './additionalFeeDialog';

class Delivery extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    delivery: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    deliveryFee: PropTypes.number,
    onDeliveryFeeChange: PropTypes.func.isRequired,
  }
  state = { editing: false }
  render() {
    const { delivery: { inside, fee, minimum, raise }, amount, deliveryFee, onDeliveryFeeChange, classes } = this.props;
    const editing = this.state.editing;
    return (
      <div className={`${classes.line} ${classes.services}`}>
        <div className="_left">
          { fee == null && <small className={styles.w100}>{inside ? `未达到起送价格(￥${minimum})` : '不在店铺的服务区内'}</small> }
        </div>
        <div className="_right">
          <div className="_info">
            {fee == null && (
              <small className={styles.colorSubTitle}>
                {inside ? `还差￥${minimum - amount}达到起送价格` : '您不在店铺的服务区内'}
                <br />
                请与卖家商议运费
                <br />
                您仍然可以直接提交订单，如卖家愿意送货，稍候会确认订单总价
              </small>
            )}
            {(inside && raise) && (
              <small className={styles.colorSubTitle}>
                {raise.map((r, i) => <span key={i}>{`再加￥${r.value}的货物，运费即可减至￥${r.fee}`}<br /></span>)}
              </small>
            )}
          </div>
          <div className="_amount">
            <div className="_amount">
              <small>运费：</small>
              <span>
                { fee != null && `￥${fee}` }
                { fee == null && (deliveryFee != null ? `￥${deliveryFee}` : '待议') }
                <br />
                { fee == null && (
                  <small>
                    <a href="#_non_existing" onClick={(e) => { e.preventDefault(); this.setState({ editing: true }); }}>
                      { deliveryFee ? '修改' : '已经商议过了？' }
                    </a>
                  </small>
                )}
              </span>
              { editing && (
                <AddtionalFeeDialog
                  title="运费"
                  label="运费"
                  close={() => this.setState({ editing: false })}
                  value={deliveryFee}
                  onSubmit={onDeliveryFeeChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delivery;
