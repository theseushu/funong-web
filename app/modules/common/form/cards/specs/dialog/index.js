import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _uniq from 'lodash/uniq';
import _without from 'lodash/without';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';
import { Chip } from 'react-mdl/lib/Chip';
import { units } from 'funong-common/lib/appConstants';
import { isQuantityInvalid, isPriceInvalid } from 'funong-common/lib/utils/validationUtils';
import { Dialog } from 'modules/common/dialog';
import styles from 'modules/common/styles';

const EMPTY = {
  name: '',
  params: [],
  unit: '',
  price: '',
  minimum: '',
};

class SpecsDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    spec: PropTypes.object,
    useMinimum: PropTypes.bool,
    isDefault: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    const { spec = EMPTY, useMinimum } = this.props;
    if (useMinimum) {
      this.state = { name: props.isDefault ? '默认' : spec.name, params: spec.params, price: spec.price.toString(), unit: spec.unit, minimum: spec.minimum.toString(), newParam: '' };
    } else {
      this.state = { name: props.isDefault ? '默认' : spec.name, params: spec.params, price: spec.price.toString(), unit: spec.unit, newParam: '' };
    }
  }
  onNewParamChanged = (e) => {
    this.setState({ newParam: e.target.value });
  }
  onNameChanged = (e) => {
    this.setState({ name: e.target.value });
  }
  onMinimumChanged = (e) => {
    this.setState({ minimum: e.target.value });
  }
  onPriceChanged = (e) => {
    this.setState({ price: e.target.value });
  }
  onUnitChanged = (unit) => {
    this.setState({ unit });
  }
  onSubmit = () => {
    const { onSubmit, useMinimum } = this.props;
    const { name, params, price, unit, minimum } = this.state;
    if (useMinimum) {
      onSubmit({ name, params, price: Number(price), unit, minimum: Number(minimum) });
    } else {
      onSubmit({ name, params, price: Number(price), unit });
    }
  }
  addSpecParam = (e) => {
    e.preventDefault();
    const newParam = this.state.newParam.trim();
    const { params } = this.state;
    this.setState({ newParam: '', params: _uniq([...params, newParam]) });
  }
  removeSpecParam = (param) => {
    const { params } = this.state;
    this.setState({ params: _without(params, param) });
  }
  render() {
    const { close, isDefault, spec, classes, useMinimum } = this.props;
    const { name, params, price, unit, minimum, newParam } = this.state;
    const error = {
      name: name.trim() === '' && '必填',
      params: params.length === 0 && '必填',
      price: isPriceInvalid(price) || null,
      unit: unit.trim() === '' && '必填',
      minimum: (useMinimum && isQuantityInvalid(minimum)) || null,
    };
    return (
      <Dialog
        show onHide={close}
        onCancel={close}
        title={spec ? '修改规格' : '新规格'}
        fixedHeight
        scrollableContent={
          <div>
            {
              isDefault ?
                <div className={classes.title}>默认</div> :
                <div className={classes.line}>
                  <Textfield
                    label="名称" name="_specName" floatingLabel required
                    onChange={this.onNameChanged} value={name}
                  />
                </div>
            }
            <div className={classes.line}>
              {error.params && <span className={styles.colorError}><small>尚无任何参数</small></span>}
              {params.map((param, i) => (<Chip key={i} onClose={() => this.removeSpecParam(param)}>{param}</Chip>))}
            </div>
            <div className={classes.line}>
              <Textfield
                label="添加新规格参数" name="_specParameter" floatingLabel
                onChange={this.onNewParamChanged} value={newParam} required={!!error.params}
              />
              <Button
                colored onClick={this.addSpecParam}
                disabled={newParam.trim() === '' || params.indexOf(newParam.trim()) >= 0}
              >
                {params.indexOf(newParam.trim()) >= 0 ? '重复' : '添加'}
              </Button>
            </div>
            <div className={classes.priceLine}>
              <Textfield
                label="价格" name="_price" floatingLabel type="number" required style={{ flex: 1 }}
                onChange={this.onPriceChanged} value={price} error={price === '' ? null : error.price}
              />
              <Textfield
                label="单位" name="_unit" floatingLabel required style={{ marginLeft: 16, width: 80 }}
                onChange={(e) => { e.preventDefault(); this.onUnitChanged(e.target.value); }}
                onFocus={(e) => { e.preventDefault(); this.setState({ showUnits: true }); }}
                onBlur={(e) => { e.preventDefault(); this.setState({ showUnits: false }); }}
                value={unit}
              />
            </div>
            <div className={`material-transition ${classes.params}`}>
              {units.map((u, i) => <Button key={i} colored onClick={(e) => { e.preventDefault(); this.setState({ unit: u }); }}>{u}</Button>)}
            </div>
            {useMinimum && (
              <div className={classes.line}>
                <Textfield
                  label="最小批发量（金额）" name="_priceMinCount" floatingLabel type="number" required
                  onChange={this.onMinimumChanged} value={minimum} error={minimum === '' ? null : error.minimum}
                />
              </div>
            )}
          </div>
        }
        submit={{
          onSubmit: (e) => { e.preventDefault(); this.onSubmit(); },
          disabled: (!!error.name || !!error.params || !!error.price || !!error.unit || !!error.minimum),
        }}
      />
    );
  }
}

const layout = {
  maxWidth: '100%',
  rowGutter: 24,
};
export default injectSheet({
  title: {
    maxWidth: layout.maxWidth,
    margin: '24px auto 16px',
    display: 'flex',
    alignItems: 'center',
  },
  line: {
    marginTop: layout.rowGutter,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: layout.maxWidth,
    '& > .mdl-textfield': {
      flex: 1,
    },
  },
  priceLine: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: layout.maxWidth,
  },
  params: {
    maxWidth: layout.maxWidth,
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
  tableButtons: {
    width: 64,
    height: 24,
    '& > div': {
      display: 'inline-block',
    },
  },
  tableInlineButton: {
    position: 'relative',
    width: 32,
    height: 24,
    '& > button': {
      position: 'absolute',
      left: 0,
      top: -4,
    },
  },
})(SpecsDialog);
