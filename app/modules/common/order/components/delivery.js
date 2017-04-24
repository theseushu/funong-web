import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles, { breakpoints, colors } from 'modules/common/styles';
import { orderFeeTypes } from 'funong-common/lib/appConstants';
import { isOwner as isOrderOwner, calculateProductAmount } from 'funong-common/lib/utils/orderUtils';
import { layouts } from '../styles';
import FeeDialog from './feeDialog';

class Delivery extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    onChange: PropTypes.func,
  }
  state = { editing: false }
  renderMessage = ({ fee, inside, minimum }) =>
    fee === -1 && <small className={styles.w100}>{inside ? `未达到起送价格(￥${minimum})` : '不在店铺的服务区内'}</small>
  renderMessageReadonly = () => null
  renderInstruction = ({ fee, inside, minimum, raise }, productAmount, isOwner) => (
    <div className="_info">
      {fee === -1 && isOwner && (
        <small className={styles.colorSubTitle}>
          {inside ? `还差￥${minimum - productAmount}达到起送价格` : '您不在店铺的服务区内'}
          <br />
          请与卖家商议运费
          <br />
          您仍然可以直接提交订单，如卖家愿意送货，稍候会确认订单总价
        </small>
      )}
      {fee === -1 && !isOwner && (
        <small className={styles.colorSubTitle}>
          {inside ? `还差￥${minimum - productAmount}达到起送价格` : '买家不在店铺的服务区内'}
          <br />
          请确定运费。您也可以谢绝送货，取消该订单
        </small>
      )}
      {(inside && raise) && isOwner && (
        <small className={styles.colorSubTitle}>
          {raise.map((r, i) => <span key={i}>{`再加￥${r.value}的货物，运费即可减至￥${r.fee}`}<br /></span>)}
        </small>
      )}
    </div>
  )
  renderInstructionReadonly = () => null
  renderFee = (fee, isOwner) => (
    <div className="_amount">
      <small>运费：</small>
      <span>
        { fee !== -1 ? `￥${fee}` : '待议' }
        <br className="_line_breaker" />
        <small>
          <a href="#_non_existing" onClick={(e) => { e.preventDefault(); this.setState({ editing: true }); }}>
            { fee !== -1 ? ' 修改' : ((isOwner && ' 已经商议过了？') || (!isOwner && ' 确定运费'))}
          </a>
        </small>
      </span>
      { this.state.editing && (
        <FeeDialog
          title="运费"
          label="运费"
          close={() => this.setState({ editing: false })}
          value={fee === -1 ? null : fee}
          onSubmit={this.props.onChange}
        />
      )}
    </div>
  )
  renderFeeReadonly = (fee) => (
    <div className="_amount">
      <small>运费：</small>
      <span>
        { `￥${fee}`}
      </span>
    </div>
  )
  render() {
    const { order, user, classes } = this.props;
    const { fees, can } = order;
    const isOwner = isOrderOwner(order, user);
    const fee = fees[orderFeeTypes.delivery.key];
    if (!can.delivery) {
      return null;
    }
    const productAmount = calculateProductAmount(order);
    const editable = can.delivery && can.delivery.fee === -1;
    return (
      <div className={classes.delivery}>
        <div className="_left">
          {this.renderMessage(can.delivery)}
        </div>
        <div className="_right">
          {this.renderInstruction(can.delivery, productAmount, isOwner)}
          {editable ? this.renderFee(fee, isOwner) : this.renderFeeReadonly(fee)}
        </div>
      </div>
    );
  }
}

export default injectSheet({
  delivery: {
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
})(Delivery);
