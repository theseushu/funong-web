import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import Categories from './categories';

class CriteriaCategorySelector extends Component {
  static propTypes = {
    selected: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    classes: PropTypes.object.isRequired,
    catalogGroups: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
  }
  state = { index: null };
  onSelect = (category) => {
    const { onSelect } = this.props;
    onSelect(category);
  }
  setSelection = (index) => {
    this.setState({ index });
  }
  render() {
    const { selected, catalogGroups, classes, hide } = this.props;
    const { index } = this.state;
    return (
      <div className={`${classes.wrapper} shadow--3 ${index != null ? ' full-width' : ''}`} onMouseLeave={hide}>
        <ul className={classes.catalogs}>
          {
            catalogGroups.map((group, i) => (
              <li key={i} className={i === index ? 'selected' : null} onMouseEnter={() => this.setSelection(i)}>
                {group.join('、')}
              </li>
            ))
          }
        </ul>
        {
          index != null && (
            <div className={classes.categories}>
              <Categories category={selected} catalogs={catalogGroups[index]} onSelect={this.onSelect} />
            </div>
          )
        }
      </div>
    );
  }
}

export const height = 322;

export default injectSheet({
  wrapper: {
    display: 'flex',
    background: 'transparent',
    zIndex: 999,
    '&.full-width': {
      width: '100%',
    },
  },
  catalogs: {
    listStyleType: 'none',
    padding: '8px 0',
    margin: 0,
    zIndex: 1,
    background: colors.colorMenuBg,
    '& > li': {
      height: 36,
      lineHeight: '36px',
      padding: '0 8px',
      borderRight: `solid 1px ${colors.colorLightGrey}`,
      color: colors.colorText,
      '&.selected': {
        background: '#fafafa',
        borderRight: 'none',
      },
    },
  },
  categories: {
    zIndex: 0,
    flex: 1,
    border: `solid 1px ${colors.colorLightGrey}`,
    minHeight: height,
    boxSizing: 'border-box',
    background: '#fafafa',
    maxHeight: 500,
    overflowY: 'scroll',
    marginLeft: -1,
  },
})(CriteriaCategorySelector);

