import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Label from './label';
import FloatingSelector from './floatingSelector';

class SelectorButton extends Component {
  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    catalogGroups: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
  }
  state = { show: false }
  render() {
    const { classes, catalogGroups, category } = this.props;
    const { show } = this.state;
    return (
      <span className={classes.wrapper}>
        <Button colored onMouseEnter={() => this.setState({ show: true })}>全部分类</Button>
        { category && '>'}
        { category && <span><Label category={category} /></span>}
        { show && (
          <FloatingSelector category={category} catalogGroups={catalogGroups} hide={() => this.setState({ show: false })} />
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
})(SelectorButton);
