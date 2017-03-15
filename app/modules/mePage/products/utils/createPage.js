import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';
import Tabs from '../tabs';
import PageComponent from '../../page';

export default (editPath, Card, horizontal, Title) => {
  class Page extends Component { // eslint-disable-line
    static propTypes = {
      sheet: PropTypes.object.isRequired,
      products: PropTypes.array.isRequired,
    }
    render() {
      const { products, sheet: { classes } } = this.props;
      return (
        <PageComponent smallContent={false}>
          <div className={classes.content}>
            <Tabs />
            { Title && <Title /> }
            <div className={classes.products}>
              <div className={classes.createButton}><Link to={`/${editPath}/new`}><FABButton accent><Icon name="add" /></FABButton></Link></div>
              {
                products.map((product, i) => (
                  <div key={i} className={horizontal ? classes.productHorizontal : classes.product}>
                    <Card
                      product={product}
                      actions={[
                        <Button key={0} colored accent>{'上架'}</Button>,
                        <Link key={1} to={`/${editPath}/${product.objectId}?edit=true`}><IconButton colored name="edit"></IconButton></Link>,
                        <IconButton key={2} accent name="delete_sweep">删除</IconButton>,
                      ]}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </PageComponent>
      );
    }
  }
  return injectSheet({
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
      position: 'relative',
      borderTop: `solid 1px ${colors.colorLightGrey}`,
    },
    product: {
      width: '25%',
      boxSizing: 'border-box',
      padding: 8,
      [breakpoints.mediaSmallScreen]: {
        width: '33.33%',
      },
      [breakpoints.mediaDestkopBelow]: {
        width: '33.33%',
      },
      '@media (max-width: 680px)': {
        width: '50%',
      },
      [breakpoints.mediaTabletBelow]: {
        width: '50%',
      },
      '@media (max-width: 400px)': {
        width: '100%',
      },
    },
    createButton: {
      position: 'absolute',
      right: 16,
      top: -28,
    },
    productHorizontal: {
      width: '33.3%',
      boxSizing: 'border-box',
      padding: 8,
      [breakpoints.mediaSmallScreen]: {
        width: '33.33%',
      },
      [breakpoints.mediaDestkopBelow]: {
        width: '50%',
      },
      '@media (max-width: 680px)': {
        width: '100%',
      },
    },
  })(Page);
};
