import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';
import { selectors, actions } from 'api/species';
import { speciesSelector } from 'modules/data/ducks/selectors';
import { Dialog } from 'modules/common/dialog';
import blockLoading from 'assets/blockLoading.gif';
import Create from './create';

class SpeciesDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    selected: PropTypes.object,
    species: PropTypes.array.isRequired,
    fetchSpecies: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    onSelect: PropTypes.func,
  }
  componentWillMount() {
    const { selected } = this.props;
    this.setState({ selected });
  }
  componentDidMount() {
    const { category, fetchSpecies } = this.props;
    fetchSpecies({ category });
  }
  render() {
    const { category, pending, species, onSelect, onHide, classes } = this.props;
    const { selected } = this.state;
    return (
      <Dialog
        show
        title="选择品种"
        onHide={onHide}
        onCancel={onHide}
        scrollableContent={
          <div>
            { pending && (
            <div className={classes.loading}>
              <img src={blockLoading} role="presentation" />
            </div>
              )
            }
            {
              !pending && (
                species.map((s, i) => (
                  <Button
                    key={i}
                    colored={selected && selected.objectId === s.objectId}
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ selected: s });
                      onSelect(s);
                    }}
                  >{s.name}</Button>
                ))
              )
            }
            { !pending && <Create category={category} species={species} onCreated={() => {}} /> }
          </div>
        }
      />
    );
  }
}

const { fetchSpecies } = actions;
const fetchSpeciesSelector = selectors.fetchSpecies;

export default injectSheet({
})(connect(
  (state, { category }) => ({ ...fetchSpeciesSelector(state), species: speciesSelector(state).filter((s) => s.category.objectId === category.objectId) }),
  (dispatch) => bindActionCreators({ fetchSpecies }, dispatch),
)(SpeciesDialog));
