import React, { Component, PropTypes } from 'react';
import FormButton from 'modules/common/formElements/button';
import { Dialog } from 'modules/common/species';
import styles from 'modules/common/styles';

class SpeciesField extends Component {
  static propTypes = {
    category: PropTypes.object,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
  };
  state = { showDialog: false }
  setSpecies = (s) => {
    const { input: { onChange } } = this.props;
    onChange(s);
    this.hideDialog();
  }
  showDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDialog: true });
  }
  hideDialog = () => {
    this.setState({ showDialog: false });
  }
  render() {
    const { category, input: { value }, meta: { error } } = this.props;
    const { showDialog } = this.state;
    const selected = value || null;
    return (
      <div className={error && styles.colorError}>
        {
          category ?
            <FormButton error={error} onClick={this.showDialog}>品种： {selected ? selected.name : '点击选择'}</FormButton> :
            <FormButton disabled>请先选择分类</FormButton>
        }
        { showDialog &&
          <Dialog
            selected={selected} category={category} onSelect={this.setSpecies} onHide={this.hideDialog}
          />
        }
      </div>
    );
  }
}

export default SpeciesField;
