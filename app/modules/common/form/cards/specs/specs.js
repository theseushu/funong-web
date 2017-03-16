import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import FormIconButton from 'modules/common/formElements/iconButton';
import SpecDialog from 'modules/common/specDialog';
import { formatPrice } from 'utils/displayUtils';
import { colors } from 'modules/common/styles';
import moduleStyles from '../../moduleStyles';

class Specs extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
    classes: PropTypes.object,
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
    const { input: { value }, meta: { error }, classes } = this.props; // eslint-disable-line
    const { editingIndex } = this.state;
    return (
      <Card shadow={1} className={classes.card}>
        <CardTitle>
          规格
        </CardTitle>
        <CardText>
          {value.length > 0 && (
            <List className={classes.list}>
              {
                value.map((spec, i) => (
                  <ListItem key={i} threeLine>
                    <ListItemContent
                      subtitle={spec.params.join(', ')}
                    ><span>{spec.name}<small> {formatPrice(spec)}</small></span></ListItemContent>
                    <ListItemAction>
                      <IconButton name="edit" onClick={(e) => { e.preventDefault(); this.editSpec(i); }} />
                      <IconButton name="delete_sweep" onClick={(e) => { e.preventDefault(); this.removeSpec(spec); }} />
                    </ListItemAction>
                  </ListItem>
                ))
              }
            </List>
          )
          }
        </CardText>
        <FormIconButton
          error={error}
          className={classes.iconButton}
          name="add_circle" ripple onClick={(e) => { e.preventDefault(); this.addSpec(); }}
        />
        {
          editingIndex !== null && (
            <SpecDialog
              isDefault={editingIndex === 0}
              spec={value[editingIndex]}
              close={this.hideDialog}
              onSubmit={this.saveSpec}
            />
          )
        }
      </Card>
    );
  }
}

export default injectSheet({
  ...moduleStyles,
  list: {
    margin: 0,
    padding: 0,
    '& > li': {
      height: 56,
      padding: 0,
      marginBottom: 8,
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
  },
})(Specs);
