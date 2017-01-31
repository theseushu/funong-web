import React, { Component, PropTypes } from 'react';
import Dialog from '../dialog';
import Breadcrumb from './components/breadcrumb';
import Types from './components/types';
import Results from './components/results';
import { catalogTypes } from '../../../constants';

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
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.shape({
        name: PropTypes.string.isRequired,
        objectId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    }),
  };
  constructor(props) {
    super(props);
    const { category } = props;
    this.state = { // catalogType is string, others are objects
      catalogType: (category && category.catalog.type) || catalogTypes.supply.farm.value,
      catalog: category && category.catalog,
      category,
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
      this.props.onSubmit({ ...category, catalog: { ...catalog, type: catalogType } });
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
    let selection;
    if (!catalog) {
      const { pending, fulfilled, rejected, error, catalogs } = this.props.fetchCatalogsState;
      resultsParams = { pending, fulfilled, rejected, error, results: catalogs.filter((c) => c.type === catalogType) };
      resultsParams.onClick = (selectedCatalog) => this.setSelection({ catalogType, catalog: selectedCatalog });
      selection = null;
    } else {
      const { pending, fulfilled, rejected, error, categories } = this.props.fetchCategoriesState;
      resultsParams = { pending, fulfilled, rejected, error, results: categories };
      resultsParams.onClick = (selectedCategory) => this.setSelection({ catalogType, catalog, category: selectedCategory });
      selection = category && category.objectId;
    }
    return (
      <Results {...resultsParams} isButtonActive={(c) => c.objectId === selection} />
    );
  }
  render() {
    const { close, show } = this.props;
    console.log(show)
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
        scrollableContent={this.renderSearchResult()}
      />
    );
  }
}

export default categorySelectorDialog;
