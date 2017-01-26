import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';

import SpecificationDialog from '../../common/specificationDialog';

class SpecificationsField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    sheet: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  showDialog = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ showDialog: true });
  }

  hideDialog = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ showDialog: false });
  }

  addSpec = (spec) => {
    const { input: { value, onChange } } = this.props;
    if (value === '') {
      onChange([spec]);
    } else {
      onChange([...value, spec]);
    }
  }

  removeSpec = (spec) => {
    const { input: { onChange } } = this.props;
    onChange(_without(spec, spec));
  }

  render() {
    const { input: { value }, meta, sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    return (
      <Grid>
        <Cell col={2} tablet={2} phone={1} className={classes.field}>
          规格
        </Cell>
        <Cell col={10} tablet={6} phone={3} className={classes.field}>
          <IconButton colored name="add_circle" ripple onClick={this.showDialog}></IconButton>
          { showDialog && <SpecificationDialog isDefault={!value} close={this.hideDialog} value={typeof value === 'string' ? [] : value} onSubmit={this.addSpec} />}
        </Cell>
        {
          value.length > 0 && <List className={classes.list}>
            {
              value.map((spec, i) => (
                <ListItem key={i} threeLine>
                  <ListItemContent
                    subtitle={spec.params.join(', ')}
                  >{spec.name}</ListItemContent>
                  <ListItemAction>
                    <IconButton name="delete_sweep" accent onClick={() => this.removeSpec(spec)} />
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
