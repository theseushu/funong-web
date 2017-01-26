import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { formatPrices } from '../../../utils/displayUtils';

import SpecificationDialog from '../../common/specificationDialog';

class SpecificationsField extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
    sheet: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { editingIndex: null };
  }

  hideDialog = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ editingIndex: null });
  }

  addSpec = () => {
    const { input: { value } } = this.props;
    this.setState({ editingIndex: value.length });
  }

  editSpec = (index) => {
    this.setState({ editingIndex: index });
  }

  saveSpec = (spec) => {
    const { input: { value, onChange } } = this.props;
    const { editingIndex } = this.state;
    const specs = [...value];
    specs[editingIndex] = spec;
    onChange(specs);
    this.setState({ editingIndex: null });
  }

  removeSpec = (spec) => {
    const { input: { value, onChange } } = this.props;
    onChange(_without(value, spec));
  }

  render() {
    const { input: { value }, meta, sheet: { classes } } = this.props; // eslint-disable-line
    const { editingIndex } = this.state;
    return (
      <Grid>
        <Cell col={2} tablet={2} phone={1} className={classes.field}>
          规格
        </Cell>
        <Cell col={10} tablet={6} phone={3} className={classes.field}>
          <IconButton name="add_circle" ripple onClick={(e) => { e.preventDefault(); this.addSpec(); }}></IconButton>
          {
            editingIndex !== null && (
              <SpecificationDialog
                isDefault={editingIndex === 0}
                specification={value[editingIndex]}
                close={this.hideDialog}
                onSubmit={this.saveSpec}
              />
            )
          }
        </Cell>
        {
          value.length > 0 && <List className={classes.list}>
            {
              value.map((spec, i) => (
                <ListItem key={i} threeLine className="mdl-shadow--2dp">
                  <ListItemContent
                    subtitle={spec.params.join(', ')}
                  ><span>{spec.name}<small>{formatPrices(spec.prices)}</small></span></ListItemContent>
                  <ListItemAction>
                    <IconButton name="edit" onClick={() => this.editSpec(i)} />
                    <IconButton name="delete_sweep" onClick={() => this.removeSpec(spec)} />
                  </ListItemAction>
                </ListItem>
              ))
            }
            </List>
        }
      </Grid>
    );
  }
}

export default injectSheet({
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  list: {
    margin: '0 auto',
    padding: 0,
    width: '100%',
  },
})(SpecificationsField);
