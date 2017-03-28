import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { breakpoints } from 'modules/common/styles';

const List = ({ products, horizontal, editPath, Card, classes }) => (
  <div className={classes.products}>
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
);

List.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  horizontal: PropTypes.bool,
  Card: PropTypes.any.isRequired,
  editPath: PropTypes.string.isRequired,
};

export default injectSheet({
  products: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
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
})(List);
