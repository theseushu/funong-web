import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormButton from 'modules/common/formElements/button';
import { Dialog } from 'modules/common/categories';
import styles from 'modules/common/styles';
import { Field, change } from 'redux-form';
import { required } from '../../validations';

class CategoryField extends Component {
  static propTypes = {
    catalogs: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    clearSpecies: PropTypes.func.isRequired,
  };
  state = { showDialog: false }
  setCategory = (category) => {
    const { input: { onChange }, clearSpecies } = this.props;
    onChange(category);
    clearSpecies();
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
    const { catalogs, input: { value }, meta: { error } } = this.props;
    const { showDialog } = this.state;
    const category = value || null;
    return (
      <div className={error && styles.colorError}>
        <FormButton error={error} onClick={this.showDialog}>分类： {category ? category.name : '点击选择'}</FormButton>
        { showDialog &&
          <Dialog
            selected={category} catalogs={catalogs} onSelect={this.setCategory} onHide={this.hideDialog}
          />
        }
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch, { form }) => bindActionCreators({ clearSpecies: () => change(form, 'species', '') }, dispatch),
)((props) => <Field name="category" component={CategoryField} props={{ ...props }} validate={[required]} />);
