import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import _without from 'lodash/without';
import Button from 'react-mdl/lib/Button';
import { provinces as allProvinces } from 'appConstants';
import { Dialog } from 'modules/common/dialog';

class ProvincesSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    provinces: PropTypes.array.isRequired,
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    const { provinces } = props;
    this.state = { provinces: [...provinces] };
  }
  all = () => {
    this.setState({ provinces: [] });
  }
  select = (province) => {
    this.setState({ provinces: [...this.state.provinces, province] });
  }
  deselect = (province) => {
    this.setState({ provinces: _without(this.state.provinces, province) });
  }
  submit = () => {
    this.props.onSubmit(this.state.provinces);
  }
  render() {
    const { title, close, show } = this.props;
    const { provinces } = this.state;
    return (
      <Dialog
        show={show}
        onHide={close}
        onCancel={close}
        title={title || '选择服务区域'}
        scrollableContent={
          <div>
            <Button
              colored={provinces.length === 0}
              onClick={(e) => {
                e.preventDefault();
                this.all();
              }}
            >全国</Button>
            {allProvinces.map((p, i) => {
              const selected = !!_find(provinces, (province) => province === p.value);
              return (
                <Button
                  key={i}
                  colored={selected}
                  onClick={(e) => {
                    e.preventDefault();
                    if (selected) {
                      this.deselect(p.value);
                    } else {
                      this.select(p.value);
                    }
                  }}
                >{p.title}</Button>
              );
            })}
          </div>
        }
        submit={{
          onSubmit: (e) => { e.preventDefault(); this.submit(); },
        }}
      />
    );
  }
}

export default ProvincesSelectorDialog;
