import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _find from 'lodash/find';
import _without from 'lodash/without';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import { toastr } from 'react-redux-toastr';

import Dialog from '../dialog';

const styles = {
};

class specificationsSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    specifications: PropTypes.array.isRequired,
    fetchSpecificationsState: PropTypes.object,
    createSpecificationState: PropTypes.object,
    fetchSpecifications: PropTypes.func.isRequired,
    createSpecification: PropTypes.func.isRequired,
    species: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      specifications: props.specifications || [],
      name: '',
      selected: [],
      showCreation: false,
    };
  }
  componentDidMount() {
    const { species } = this.props;
    this.props.fetchSpecifications({ species });
  }
  submit = () => {
    // if (typeof this.props.onSubmit === 'function') {
    //   this.props.onSubmit({ ...species, category: { ...category, catalog: { ...catalog, catalogType } } });
    // }
    this.props.close();
  }
  createNewSpec = () => {
    const { createSpecification, species } = this.props;
    const { name } = this.state;
    createSpecification({ species,
      name,
      meta: {
        resolve: (spec) => {
          this.setState({ name: '' });
          this.setState({ showCreation: false, selected: [...this.state.selected, spec] });
        },
        reject: (error) => {
          toastr.error('创建新规格失败', `${error && error.message}`);
        },
      } });
  }
  toggleSelection = (spec) => {
    const selectedSpec = _find(this.state.selected, (s) => s.objectId === spec.objectId);
    if (!selectedSpec) {
      this.setState({ selected: [...this.state.selected, spec] });
    } else {
      this.setState({ selected: _without(this.state.selected, selectedSpec) });
    }
  }
  renderHeader = () => {
    if (this.props.fetchSpecificationsState.pending) {
      return null;
    }
    const { pending } = this.props.createSpecificationState;
    const disabled = pending || this.state.name === '';
    return (
      <div>
        <ControlLabel><Button bsStyle="link" onClick={() => this.setState({ showCreation: !this.state.showCreation })}>没有您需要的？创建一个</Button></ControlLabel>
        <Collapse in={this.state.showCreation}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
              <InputGroup.Button>
                <Button onClick={this.createNewSpec} disabled={disabled}>确定</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Collapse>
      </div>
    );
  }
  renderSearchResult = () => {
    const { specifications } = this.props;
    const { selected } = this.state;
    return (
      <div>
        {specifications.map((spec, i) => {
          const isSelected = (_find(selected, (s) => s.objectId === spec.objectId) != null);
          return <Button onClick={() => this.toggleSelection(spec)} bsStyle={isSelected ? 'info' : 'link'} key={i}>{spec.name}</Button>;
        })
        }
      </div>
    );
  }
  render() {
    const { close, onSubmit } = this.props;
    return (
      <Dialog
        show
        onHide={close}
        onCancel={close}
        title={'选择规格'}
        fixedContent={
          <div>
            {this.renderHeader()}
          </div>
        }
        scrollableContent={
          <div>
            {this.renderSearchResult()}
          </div>
        }
        submit={{
          onSubmit: () => {
            console.log(1)
            onSubmit(this.state.selected);
            close();
          },
          disabled: this.state.selected.length === 0,
        }}
      />
    );
  }
}

export default injectSheet(styles)(specificationsSelectorDialog);
