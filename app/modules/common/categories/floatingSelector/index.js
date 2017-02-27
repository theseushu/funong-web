import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import Categories from './categories';

class FloatingSelector extends Component {
  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    classes: PropTypes.object.isRequired,
    catalogGroups: PropTypes.array.isRequired,
    hide: PropTypes.func,
  }
  state = { index: null };
  setSelection = (index) => {
    this.setState({ index });
  }
  hide = () => {
    this.setSelection(null);
    if (this.props.hide) {
      this.props.hide();
    }
  }
  render() {
    const { category, catalogGroups, classes } = this.props;
    const { index } = this.state;
    return (
      <div className={`${classes.wrapper} shadow--3 ${index != null ? ' full-width' : ''}`} onMouseLeave={this.hide}>
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
              <Categories category={category} catalogs={catalogGroups[index]} hide={this.hide} />
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
    maxHeight: 600,
    overflowY: 'scroll',
    marginLeft: -1,
  },
})(FloatingSelector);

