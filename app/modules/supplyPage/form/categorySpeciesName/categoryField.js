import React, { Component, PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import FormButton from '../../../common/formElements/button';
import CategorySelectorDialog from '../../../common/categorySelectorDialog';
import styles from '../../../common/styles';

class SpeciesField extends Component {
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
    const { input: { value }, meta: { error }, sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    const category = value || null;
    return (
      <Grid className={error && styles.colorError}>
        <Cell col={4} tablet={3} phone={2} className={classes.field}>
          品种
        </Cell>
        <Cell col={8} tablet={5} phone={2} className={classes.field}>
          { showDialog &&
            <CategorySelectorDialog
              category={category} show close={this.hideDialog}
              onSubmit={this.setCategory}
            />
          }
          <FormButton error={error} onClick={this.showDialog}>{category ? category.name : '点击选择'}</FormButton>
        </Cell>
      </Grid>
    );
  }
}

SpeciesField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  sheet: PropTypes.object,
};

export default SpeciesField;
