import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { Label } from 'modules/common/categories';
import Selector from './selector';

class CriteriaCategory extends Component {
  static propTypes = {
    selected: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    catalogGroups: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }
  state = { show: false }
  onSelect = (category) => {
    const { onSelect } = this.props;
    this.hide();
    onSelect(category);
  }
  hide = () => {
    this.setState({ show: false });
  }
  render() {
    const { classes, catalogGroups, selected } = this.props;
    const { show } = this.state;
    return (
      <span className={classes.wrapper}>
        <Button colored onMouseEnter={() => this.setState({ show: true })}>全部分类</Button>
        { selected && '>'}
        { selected && <span><Label category={selected} /></span>}
        { show && (
          <Selector selected={selected} catalogGroups={catalogGroups} onSelect={this.onSelect} hide={this.hide} />
        )}
      </span>
    );
  }
}

export default injectSheet({
  wrapper: {
    display: 'inline-block',
    '& > span': {
      padding: '0 16px',
    },
    '& > div': {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
})(CriteriaCategory);
