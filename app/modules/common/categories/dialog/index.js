import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { selectors, actions } from 'api/category';
import { categoriesSelector } from 'modules/data/ducks/selectors';
import { Dialog } from 'modules/common/dialog';
import blockLoading from 'assets/blockLoading.gif';

class CategoriesDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    catalogs: PropTypes.array.isRequired,
    onHide: PropTypes.func.isRequired,
    selected: PropTypes.object,
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    onSelect: PropTypes.func,
  }
  componentWillMount() {
    const { selected } = this.props;
    this.setState({ catalog: selected && selected.catalog, selected });
  }
  componentDidMount() {
    const { fetchCategories } = this.props;
    if (this.state.catalog) {
      fetchCategories({ catalogs: [this.state.catalog] });
    }
  }
  render() {
    const { catalogs, pending, categories, fetchCategories, onSelect, onHide, classes } = this.props;
    const { selected, catalog } = this.state;
    return (
      <Dialog
        show
        title="选择分类"
        onHide={onHide}
        onCancel={onHide}
        fixedContent={
          catalog && (
            <div className={classes.breadcrumb}>
              <Button
                colored
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ catalog: null, selected: null });
                }
                }
              >
                全部
              </Button>
              <span>{' > '}</span>
              <span>{catalog}</span>
            </div>
          )
        }
        scrollableContent={
          <div className={classes.wrapper}>
            { pending && (
            <div className={classes.loading}>
              <img src={blockLoading} role="presentation" />
            </div>
              )
            }
            {
              !pending && (
                catalog ? (
                  categories.filter((c) => c.catalog === catalog).map((c, i) => (
                    <Button
                      key={i}
                      colored={selected && selected.objectId === c.objectId}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ selected: c });
                        onSelect(c);
                      }}
                    >{c.name}</Button>
                  ))
                ) : (
                  catalogs.map((c, i) => (
                    <Button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ catalog: c, selected: null });
                        fetchCategories({ catalogs: [c] });
                      }}
                    >{c}</Button>
                  ))
                )
              )
            }
          </div>
        }
      />
    );
  }
}

const { fetchCategories } = actions;
const fetchCategoriesSelector = selectors.fetchCategories;

export default injectSheet({
  breadcrumb: {
    textAlign: 'left',
    fontSize: 14,
  },
})(connect(
  (state, { catalogs }) => ({ ...fetchCategoriesSelector(state), categories: categoriesSelector(state).filter((category) => catalogs.indexOf(category.catalog) >= 0) }),
  (dispatch) => bindActionCreators({ fetchCategories }, dispatch),
)(CategoriesDialog));
