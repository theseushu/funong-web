import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import CategorySelectorDialog from '../../common/categorySelectorDialog';
import { colors } from '../../common/styles';

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
      <Grid>
        <Cell col={4} tablet={3} phone={2} className={classes.field}>
          品种
        </Cell>
        <Cell col={8} tablet={5} phone={2} className={classes.field} style={{ color: error ? colors.colorError : null }}>
          <CategorySelectorDialog category={category} show={showDialog} close={this.hideDialog} onSubmit={this.setCategory} />
          <Button colored onClick={this.showDialog}>{category ? category.name : '点击选择'}</Button>
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

export default injectSheet({
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})(SpeciesField);
