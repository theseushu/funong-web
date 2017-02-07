import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _find from 'lodash/find';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';
import { units } from 'appConstants';
import Dialog from '../dialog';
import { layout } from './styles';

const valueRegex = /^[0-9]{1,7}(\.[0-9]{1,2})?$/; // 0.01 - 9999999.99
const minCountRegex = /^[1-9][0-9]{0,7}$/; // 1 - 99999999

class PriceDialog extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onPriceSubmit: PropTypes.func.isRequired,
    sheet: PropTypes.object,
    price: PropTypes.object,
    specification: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    const { price } = props;
    const { value, unit, minCount } = price || { value: '', unit: '', minCount: '' };
    // edit all as string. convertting later when editing is done
    this.state = { value: value.toString(), unit: unit.toString(), minCount: minCount.toString() };
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { onPriceSubmit } = this.props;
    const { value, unit, minCount } = this.state;
    onPriceSubmit({ value: Number(value.trim()), unit: unit.trim(), minCount: Number(minCount.trim()) });
  }
  render() {
    const {
      index,
      title,
      onCancel,
      sheet: { classes },
      specification,
    } = this.props;

    const { value, unit, minCount } = this.state;
    const error = {};
    if (!valueRegex.test(value.trim())) {
      error.value = '请使用正数，小数位两位。示例：100, 7.13, 0.99';
    }
    if (unit.trim() === '') {
      error.unit = '必填';
    }
    if (!minCountRegex.test(minCount.trim())) {
      error.minCount = '请使用正整数';
    } else {
      const existing = _find(specification.prices.filter((p, i) => i !== index), (p) => p.minCount == minCount); // eslint-disable-line
      if (existing) {
        error.minCount = '此类价格已经设置过了';
      }
    }
    return (
      <Dialog
        show
        onHide={onCancel}
        onCancel={onCancel}
        title={title}
        fixedHeight
        scrollableContent={
          <div>
            <div className={classes.title}>
              设置价格
            </div>
            <div className={classes.line}>
              <Textfield
                label="价格（人民币，单位元）"
                name="_priceValue"
                floatingLabel
                type="number"
                required
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                }}
                value={value}
                error={error.value}
              />
            </div>
            <div className={classes.line}>
              <div>
                <Textfield
                  label="单位"
                  style={{ width: 50 }}
                  name="_priceUnit"
                  floatingLabel
                  required
                  maxLength="3"
                  onChange={(e) => this.setState({ unit: e.target.value })}
                  value={unit}
                  error={error.unit}
                />
              </div>
              <div className={classes.params}>
                {units.map((u, i) => <Button key={i} colored onClick={(e) => { e.preventDefault(); this.setState({ unit: u }); }}>{u}</Button>)}
              </div>
            </div>
            <div className={classes.line}>
              <Textfield
                label="最小数量"
                name="_priceMinCount"
                floatingLabel
                type="number"
                required
                onChange={(e) => this.setState({ minCount: e.target.value })}
                value={minCount}
                error={error.minCount}
              />
            </div>
          </div>
        }
        submit={{
          onSubmit: this.onSubmit,
          disabled: !!error.value || !!error.unit || !!error.minCount,
        }}
      />
    );
  }
}

export default injectSheet({
  title: {
    maxWidth: layout.maxWidth,
    margin: `${layout.rowGutter}px auto 0 auto`,
  },
  line: {
    margin: '0 auto',
    maxWidth: layout.maxWidth,
    '& > .mdl-textfield': {
      width: '100%',
    },
  },
})(PriceDialog);
