import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import injectSheet from 'react-jss';
import CategorySelectorDialog from '../../common/categorySelectorDialog';

class SpeciesField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }
  setCategory = () => {
    // console.log(param);
  }
  showDialog = () => {
    this.setState({ showDialog: true });
  }
  hideDialog = () => {
    this.setState({ showDialog: false });
  }
  render() {
    // const { input: { value, onChange }, meta , sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    return (
      <div>
        <CategorySelectorDialog show={showDialog} close={this.hideDialog} onSubmit={this.setCategory} />
        <Button colored onClick={this.showDialog}>点击选择</Button>
      </div>
    );
  }
}

SpeciesField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet({
  field: {
    width: '100%',
    display: 'flex',
  },
})(SpeciesField);
