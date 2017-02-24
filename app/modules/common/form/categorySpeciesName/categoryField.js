import React, { Component, PropTypes } from 'react';
import FormButton from 'modules/common/formElements/button';
import CategorySelectorDialog from 'modules/common/categorySelectorDialog';
import styles from 'modules/common/styles';

class CategoryField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }
  setCategory = (category) => {
    const { input: { onChange } } = this.props;
    onChange(category);
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
    const { input: { value }, meta: { error } } = this.props;
    const { showDialog } = this.state;
    const category = value || null;
    return (
      <div className={error && styles.colorError}>
        <FormButton error={error} onClick={this.showDialog}>分类： {category ? category.name : '点击选择'}</FormButton>
        { showDialog &&
          <CategorySelectorDialog
            category={category} show close={this.hideDialog}
            type="shop"
            onSubmit={this.setCategory}
          />
        }
      </div>
    );
  }
}

CategoryField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default CategoryField;
