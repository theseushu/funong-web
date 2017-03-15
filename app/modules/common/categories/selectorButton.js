import React, { Component, PropTypes } from 'react';
import _flatten from 'lodash/flatten';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { breakpoints } from 'modules/common/styles';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import FloatingSelector from './floatingSelector';
import Label from './label';
import Dialog from './dialog';

// class SelectorButton extends Component {
//   static propTypes = {
//     selected: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       objectId: PropTypes.string.isRequired,
//       catalog: PropTypes.string.isRequired,
//     }),
//     catalogGroups: PropTypes.array.isRequired,
//     onSelect: PropTypes.func.isRequired,
//     classes: PropTypes.object.isRequired,
//   }
//   state = { show: false }
//   onSelect = (category) => {
//     const { onSelect } = this.props;
//     this.hide();
//     onSelect(category);
//   }
//   hide = () => {
//     this.setState({ show: false });
//   }
//   render() {
//     const { classes, catalogGroups, selected } = this.props;
//     const { show } = this.state;
//     return (
//      <div className={classes.wrapper}>
//       <Button colored onClick={() => this.setState({ show: true })}>全部分类</Button>
//       { selected && '>'}
//       { selected && <span className={classes.label}><LabelWithBorder onClick={() => this.onSelect(null)}>不限</LabelWithBorder></span>}
//      { selected && <span className={classes.label}><Label category={selected} /></span>}
//      { show && (
//        <Dialog selected={selected} catalogs={_flatten(catalogGroups)} onSelect={this.onSelect} onHide={this.hide} />
//      )}
//    </div>
//     );
//   }
// }
class SelectorButton extends Component {
  static propTypes = {
    selected: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    catalogGroups: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    dialog: PropTypes.bool,
  }
  state = { showFloating: false, showDialog: false }
  onSelect = (category) => {
    const { onSelect } = this.props;
    this.hide();
    onSelect(category);
  }
  hide = () => {
    this.setState({ showFloating: false, showDialog: false });
  }
  render() {
    const { classes, catalogGroups, selected, dialog } = this.props;
    const { showFloating, showDialog } = this.state;
    return (
      <div className={classes.wrapper}>
        { !dialog && (
          <div className={classes.bigScreenOnly}>
            { <Button colored onMouseEnter={() => this.setState({ showFloating: true })}>全部分类</Button> }
            { selected && '>' }
            { selected && <span className={classes.label}><LabelWithBorder onClick={() => this.onSelect(null)}>不限</LabelWithBorder></span> }
            { selected && <span className={classes.label}><Label category={selected} /></span> }
            { showFloating && (
              <div className={classes.floating}>
                <FloatingSelector selected={selected} catalogGroups={catalogGroups} onSelect={this.onSelect} hide={this.hide} />
              </div>
            )}
          </div>
        )}
        <div className={dialog ? null : classes.smallScreenOnly}>
          <Button colored onClick={() => this.setState({ showDialog: true })}>{!selected ? '全部分类' : `分类：${selected.name}`}</Button>
          { showDialog && (
            <Dialog selected={selected} catalogs={_flatten(catalogGroups)} onSelect={this.onSelect} onHide={this.hide} />
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    display: 'inline-block',
  },
  bigScreenOnly: {
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  smallScreenOnly: {
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
  label: {
    marginLeft: 16,
  },
  floating: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
})(SelectorButton);
