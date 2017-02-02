import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import injectSheet from 'react-jss';
import CategorySelectorDialog from '../../common/categorySelectorDialog';
import { colors } from '../../common/styles';

class categories extends Component {
  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.shape({
        name: PropTypes.string.isRequired,
        objectId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    }),
    // species: PropTypes.shape({
    //   name: PropTypes.string.isRequired,
    //   objectId: PropTypes.string.isRequired,
    //   category: PropTypes.shape({
    //     name: PropTypes.string.isRequired,
    //     objectId: PropTypes.string.isRequired,
    //     catalog: PropTypes.shape({
    //       name: PropTypes.string.isRequired,
    //       objectId: PropTypes.string.isRequired,
    //       type: PropTypes.string.isRequired,
    //     }).isRequired,
    //   }),
    // }),
    setCriteria: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
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
    const { setCriteria, sheet: { classes }, category } = this.props;
    const { showDialog, catalog } = this.state;
    return (
      <div className={classes.categories}>
        <Button onClick={() => this.setState({ showDialog: true })}>{category ? category.name : '品类' }</Button>
        { showDialog &&
          <CategorySelectorDialog
            catalog={catalog} show close={this.hideDialog}
            onSubmit={(c) => { this.hideDialog(); setCriteria({ category: c }); }}
          />
        }
      </div>
    );
  }
}

export default injectSheet({
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    border: `solid 1px ${colors.colorLightGrey}`,
    marginBottom: 24,
    '& .mdl-button': {
      color: colors.colorSubTitle,
    },
  },
})(categories);
