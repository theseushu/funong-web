import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { productTypes } from 'appConstants';
import { Thumbnail } from 'modules/common/product';
import styles, { colors, breakpoints } from 'modules/common/styles';
import { humanizeTime } from 'utils/displayUtils';
import EditButton from './editButton';

const hideName = (name) => {
  if (!name) {
    return '**';
  }
  return `${name[0]}**${name[name.length - 1]}`;
};
const BidList = ({ hideContent, hideUser, classes, bids, actions }) => {
  if (hideContent) {
    return (
      <List className={hideUser ? `${classes.listWithoutAvatar} ${classes.list}` : classes.list}>
        {bids.map((bid, i) => (
          <ListItem key={i}>
            <ListItemContent>
              <div className={classes.subTitle}>
                <span>{hideName(bid.owner.name)}</span>
                <span><small>供应量：</small>{bid.quantity}</span>
                <span style={{ float: 'right' }}> {humanizeTime(bid.updatedAt)}</span>
              </div>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <List className={hideUser ? `${classes.listWithoutAvatar} ${classes.list}` : classes.list}>
      {bids.map((bid, i) => (
        <ListItem threeLine={!hideUser} twoLine={hideUser} key={i}>
          <ListItemContent
            avatar={bid.product ? <div>
              <Thumbnail type={productTypes.supply} thumbnail={bid.product.thumbnail} />
            </div> : null}
            subtitle={
              hideUser ? (
                <div className={classes.subTitle}>
                  <small>{bid.message}</small>
                  <span style={{ float: 'right' }}> {humanizeTime(bid.updatedAt)}</span>
                  <br />
                </div>
              ) : (
                <div className={classes.subTitle}>
                  <small>{bid.owner.name}</small>
                  <span style={{ float: 'right' }}> {humanizeTime(bid.updatedAt)}</span>
                  <br />
                  <small>{bid.message}</small>
                </div>
              )
            }
          >
            <Link className={classes.title} to={`/inquiry/${bid.inquiry.objectId}`}>
              {bid.price}
              <small className={styles.colorSubTitle}> 供应量：</small><small>{bid.quantity}</small>
            </Link>
          </ListItemContent>
          <ListItemAction className={classes.actions}>
            { actions && actions.indexOf('edit') > -1 && <EditButton bid={bid} />}
            { actions && actions.indexOf('withdraw') > -1 && <Button>撤销</Button>}
            { actions && actions.indexOf('view') > -1 && <Link to={`/inquiry/${bid.objectId}`}><Button colored raised>查看详情</Button></Link>}
          </ListItemAction>
        </ListItem>
      ))}
    </List>
  );
};

BidList.propTypes = {
  hideContent: PropTypes.bool,
  hideUser: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  bids: PropTypes.array.isRequired,
  actions: PropTypes.array,
};

export default injectSheet({
  list: {
    width: '100%',
    '& > li': {
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
  },
  listWithoutAvatar: {
    maxWidth: 800,
  },
  title: {
    overflow: 'hidden',
    color: colors.colorPrice,
  },
  subTitle: {
    overflow: 'hidden',
    color: colors.colorSubTitle,
    '& > span': {
      marginRight: '2em',
    },
  },
  actions: {
    [breakpoints.mediaTabletBelow]: {
      display: 'none !important',
    },
  },
})(BidList);
