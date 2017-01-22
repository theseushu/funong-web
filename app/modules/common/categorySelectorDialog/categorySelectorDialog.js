import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Dialog from '../dialog';
import Breadcrumb from './components/breadcrumb';
import Types from './components/types';
import Results from './components/results';
import { catalogTypes } from '../../../constants';

const styles = {
};

class categorySelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      fetchCatalogs: PropTypes.func.isRequired,
      fetchCategories: PropTypes.func.isRequired,
    }).isRequired,
    fetchCatalogsState: PropTypes.shape({
      pending: PropTypes.bool,
      fulfilled: PropTypes.bool,
      rejected: PropTypes.bool,
      error: PropTypes.object,
      catalogs: PropTypes.array,
    }).isRequired,
    fetchCategoriesState: PropTypes.shape({
      pending: PropTypes.bool,
      fulfilled: PropTypes.bool,
      rejected: PropTypes.bool,
      error: PropTypes.object,
      categories: PropTypes.array,
    }).isRequired,
    value: PropTypes.shape({
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        objectId: PropTypes.string.isRequired,
        catalog: PropTypes.shape({
          name: PropTypes.string.isRequired,
          objectId: PropTypes.string.isRequired,
          catalogType: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
    }),
  };
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { // catalogType is string, others are objects
      catalogType: catalogTypes.supply.farm.value,
      catalog: value && value.category.catalog,
      category: value,
    };
  }
  componentDidMount() {
    this.search();
  }
  setSelection({ catalogType, catalog, category }) {
    // sanity check
    if (process.env.NODE_ENV !== 'production') {
      if ((category && !catalog) || (catalog && !catalogType)) {
        console.error({ catalogType, catalog, category }); // eslint-disable-line
        throw new Error('inconsistent data: any one not null should not succeed null');
      }
    }
    this.setState({ catalogType, catalog, category }, () => {
      if (category) {
        this.submit();
      } else {
        this.search();
      }
    });
  }
  search = () => {
    const { catalog } = this.state;
    if (catalog) {
      this.props.actions.fetchCategories({ catalog });
    } else {
      this.props.actions.fetchCatalogs({});
    }
  }
  submit = () => {
    const { catalogType, catalog, category } = this.state;
    // sanity check
    if (process.env.NODE_ENV !== 'production') {
      if ((!category) || (!catalog) || (!catalogType)) {
        console.error({ catalogType, catalog, category }); // eslint-disable-line
        throw new Error('inconsistent data: can not submit when one is empty');
      }
    }
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ ...category, catalog: { ...catalog, catalogType } });
    }
    this.props.close();
  }
  renderTypes = () => {
    const { catalogType } = this.state;
    return (
      <Types catalogType={catalogType} onButtonClick={(type) => this.setSelection({ catalogType: type })} />
    );
  }
  renderHeader = () => {
    const { catalogType, catalog, category } = this.state;
    if (!catalog) {
      return null;
    }
    return (
      <Breadcrumb catalogType={catalogType} catalog={catalog} category={category} onClick={(selection) => this.setSelection(selection)} />
    );
  }
  renderSearchResult = () => {
    const { catalogType, catalog, category } = this.state;
    let resultsParams = {};
    if (!catalog) {
      const { pending, fulfilled, rejected, error, catalogs } = this.props.fetchCatalogsState;
      resultsParams = { pending, fulfilled, rejected, error, results: catalogs.filter((c) => c.type === catalogType) };
      resultsParams.onClick = (selectedCatalog) => this.setSelection({ catalogType, catalog: selectedCatalog });
    } else if (!category) {
      const { pending, fulfilled, rejected, error, categories } = this.props.fetchCategoriesState;
      resultsParams = { pending, fulfilled, rejected, error, results: categories };
      resultsParams.onClick = (selectedCategory) => this.setSelection({ catalogType, catalog, category: selectedCategory });
    }
    return (
      <Results {...resultsParams} />
    );
  }
  render() {
    const { close, show } = this.props;
    return (
      <Dialog
        show={show}
        onHide={close}
        onCancel={close}
        title={'选择品种品类'}
        fixedContent={
          <div>
            {this.renderTypes()}
            {this.renderHeader()}
          </div>
        }
        scrollableContent={
          <div>
            {this.renderSearchResult()}
          </div>
        }
      />
    );
  }
}

export default injectSheet(styles)(categorySelectorDialog);
