import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import Dialog from '../dialog';
import Breadcrumb from './components/breadcrumb';
import Types from './components/types';
import Results from './components/results';

const styles = {
};

class locationSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      fetchCatalogs: PropTypes.func.isRequired,
      fetchCategories: PropTypes.func.isRequired,
      fetchSpecies: PropTypes.func.isRequired,
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
    fetchSpeciesState: PropTypes.shape({
      pending: PropTypes.bool,
      fulfilled: PropTypes.bool,
      rejected: PropTypes.bool,
      error: PropTypes.object,
      species: PropTypes.array,
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
      catalogType: value ? value.category.catalog.type : '农产品',
      catalog: value && value.category.catalog,
      category: value && value.category,
      species: value,
    };
  }
  componentDidMount() {
    this.search();
  }
  setSelection({ catalogType, catalog, category, species }) {
    // sanity check
    if (process.env.NODE_ENV !== 'production') {
      if ((species && !category) || (category && !catalog) || (catalog && !catalogType)) {
        console.error({ catalogType, catalog, category, species }); // eslint-disable-line
        throw new Error('inconsistent data: any one not null should not succeed null');
      }
    }
    this.setState({ catalogType, catalog, category, species }, () => {
      if (species) {
        this.submit();
      } else {
        this.search();
      }
    });
  }
  search = () => {
    const { catalog, category } = this.state;
    if (category) {
      this.props.actions.fetchSpecies({ category });
    } else if (catalog) {
      this.props.actions.fetchCategories({ catalog });
    } else {
      this.props.actions.fetchCatalogs({});
    }
  }
  submit = () => {
    const { catalogType, catalog, category, species } = this.state;
    // sanity check
    if (process.env.NODE_ENV !== 'production') {
      if ((!species) || (!category) || (!catalog) || (!catalogType)) {
        console.error({ catalogType, catalog, category, species }); // eslint-disable-line
        throw new Error('inconsistent data: can not submit when one is empty');
      }
    }
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ ...species, category: { ...category, catalog: { ...catalog, catalogType } } });
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
    const { catalogType, catalog, category, species } = this.state;
    if (!catalog) {
      return null;
    }
    return (
      <Breadcrumb catalogType={catalogType} catalog={catalog} category={category} species={species} onClick={(selection) => this.setSelection(selection)} />
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
    } else {
      const { pending, fulfilled, rejected, error, species } = this.props.fetchSpeciesState;
      resultsParams = { pending, fulfilled, rejected, error, results: species };
      resultsParams.isButtonActive = (buttonSpecies) => buttonSpecies.objectId === species.objectId;
      resultsParams.onClick = (selectedSpecies) => this.setSelection({ catalogType, catalog, category, species: selectedSpecies });
    }
    return (
      <Results {...resultsParams} />
    );
  }
  render() {
    const { close } = this.props;
    return (
      <Dialog
        show
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

export default injectSheet(styles)(locationSelectorDialog);
