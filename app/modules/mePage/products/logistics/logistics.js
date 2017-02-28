import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import Link from 'react-router/lib/Link';
import styles, { breakpoints } from 'modules/common/styles';
import LogisticsCard from 'modules/common/cards/logisticsProduct';
import Tabs from '../tabs';
import Page from '../../page';

class Logistics extends Component { // eslint-disable-line
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }
  render() {
    const { products, sheet: { classes } } = this.props;
    return (
      <Page smallContent={false}>
        <div className={classes.content}>
          <Tabs />
          <div className={classes.menu}>
            <Link to="/logistics/new">
              <FABButton colored ripple>
                <Icon name="add" />
              </FABButton>
            </Link>
          </div>
          <div className={classes.products}>
            {
              products.map((product, i) => (
                <div key={i} className={`${classes.cell} ${styles.contentCenter}`}>
                  <LogisticsCard product={product} hideActions={false} />
                </div>
              ))
            }
          </div>
        </div>
      </Page>
    );
  }
}

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  products: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  cell: {
    width: '50%',
    boxSizing: 'border-box',
    padding: 8,
    [breakpoints.mediaSmallScreen]: {
      width: '50%',
    },
    '@media (max-width: 680px)': {
      width: '100%',
    },
  },
  menu: {
    padding: 16,
  },
})(Logistics);
