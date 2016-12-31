import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import Field from './field';

const styles = {
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    '& > ._price': {
      width: '100%',
    },
    '@media (min-width: 544px)': {
      flexDirection: 'row',
      '& > ._price': {
        width: 200,
        marginRight: 15,
      },
    },
  },
};

const PriceInputComponent = ({ sheet: { classes }, value, onChange }) => (
  <div className={classes.inputsWrapper}>
    <input
      type="number"
      className="form-control _price"
      placeholder="输入价格，单位（元）"
      value={value.price}
      onChange={(e) => {
        try {
          const price = Number(e.target.value);
          if (price < 100000) {
            onChange({ price: price > 0 ? price : '', desc: value.desc });
          }
            } catch (e) { // eslint-disable-line
              // do nothing. if the price cannot convert to number, ignore it
        }
      }}
    />
    <input
      type="text"
      className="form-control"
      maxLength={140}
      placeholder={value.price === '' ? '说明，如20元/斤，10元/包，每包500克' : `${value.price}元每斤`}
      value={(value.desc === '' && value.price !== '') ? `${value.price}元每斤` : value.desc}
      onChange={(e) => onChange({ price: value.price, desc: e.target.value })}
    />
  </div>
);

PriceInputComponent.propTypes = {
  sheet: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};

const PriceInput = injectSheet(styles)(PriceInputComponent);

class PriceField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { showInput: false };
  }
  toggleInput = () => {
    this.setState({ showInput: !this.state.showInput });
  }
  render() {
    const { input: { value, onChange }, meta } = this.props;
    return (
      <Field label="货品价格" required meta={meta}>
        <PriceInput value={value === '' ? { price: '', desc: '' } : value} onChange={onChange} />
      </Field>
    );
  }
}

PriceField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default PriceField;
