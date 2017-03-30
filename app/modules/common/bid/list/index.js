import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { List } from 'react-mdl/lib/List';
import { colors, breakpoints } from 'modules/common/styles';
import Item, { Title } from './item';
import MyInquiryItem from './myInquiryItem';
import InquiryItem from './inquiryItem';
import MyItem from './myItem';

const BidList = ({ mine, hideContent, hideUser, classes, bids }) => {
  if (hideContent) {
    return (
      <div>
        <Title />
        <List className={classes.list}>
          {bids.map((bid, i) => (
            <Item key={i} bid={bid} />
          ))}
        </List>
      </div>
    );
  } else if (hideUser) {
    return (
      <div>
        <List className={classes.list}>
          {bids.map((bid, i) => (
            <MyInquiryItem key={i} bid={bid} />
          ))}
        </List>
      </div>
    );
  } else if (mine) {
    return (
      <div>
        <List className={classes.list}>
          {bids.map((bid, i) => (
            <MyItem key={i} bid={bid} />
          ))}
        </List>
      </div>
    );
  }
  return (
    <div>
      <List className={classes.list}>
        {bids.map((bid, i) => (
          <InquiryItem key={i} bid={bid} />
        ))}
      </List>
    </div>
  );
};

BidList.propTypes = {
  mine: PropTypes.bool,
  hideContent: PropTypes.bool,
  hideUser: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  bids: PropTypes.array.isRequired,
};

export default injectSheet({
  list: {
    width: '100%',
    '& > li': {
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
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
