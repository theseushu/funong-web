import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Checkbox from 'react-mdl/lib/Checkbox';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { productTypes } from 'appConstants';
import styles, { colors, breakpoints } from 'modules/common/styles';
import { formatPrices, formatParams, humanizeTime } from 'utils/displayUtils';
import Thumbnail from '../thumbnail';

const SupplyList = ({ classes, products, selected = [], onSelect }) => (
  <List className={classes.list}>
    {products.map((product, i) => {
      const checked = !!_find(selected, (p) => p && p.objectId === product.objectId);
      return (
        <ListItem threeLine key={i}>
          <ListItemContent
            avatar={<div><Thumbnail type={productTypes.supply} thumbnail={product.thumbnail} /></div>}
            subtitle={
              <div className={classes.subTitle}>
                <span>{formatParams(product.specs)}</span>
                <span style={{ float: 'right' }}>{humanizeTime(product.updatedAt)}</span>
              </div>
            }
          >
            <Link className={classes.title} to={`/supply/${product.objectId}`}>
              {product.name}
              <small className={styles.colorPrice}> {formatPrices(product.specs)}</small>
            </Link>
          </ListItemContent>
          <ListItemAction className={classes.actions}>
            <Checkbox
              checked={checked}
              onChange={(e) => {
                e.preventDefault();
                if (!checked) {
                  onSelect([...selected, product]);
                } else {
                  onSelect(selected.filter((p) => p.objectId !== product.objectId));
                }
              }}
            />
          </ListItemAction>
        </ListItem>
      );
    })}
  </List>
);

SupplyList.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  selected: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default injectSheet({
  list: {
    width: '100%',
    '& > li': {
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
  },
  avatar: {
    width: 52,
    height: 52,
  },
  title: {
    overflow: 'hidden',
  },
  subTitle: {
    overflow: 'hidden',
    '& > span': {
      marginRight: '2em',
    },
  },
  actions: {
    justifyContent: 'center',
    [breakpoints.mediaTabletBelow]: {
      display: 'none !important',
    },
  },
})(SupplyList);
