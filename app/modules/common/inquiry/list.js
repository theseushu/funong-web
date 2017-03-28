import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Avatar } from 'modules/common/user';
import styles, { colors, breakpoints } from 'modules/common/styles';
import { briefAddress, humanizeTime } from 'utils/displayUtils';

const InquiryList = ({ hideUser = false, classes, inquiries, actions }) => (
  <List className={hideUser ? `${classes.listWithoutAvatar} ${classes.list}` : classes.list}>
    {inquiries.map((inquiry, i) => (
      <ListItem threeLine key={i}>
        <ListItemContent
          avatar={hideUser ? null : <div><Avatar user={inquiry.owner} /></div>}
          subtitle={
            <div className={classes.subTitle}>
              {!hideUser && <span>{inquiry.owner.name}</span>}
              <span>{briefAddress(inquiry.location.address)}</span>
              <span className={styles.colorPrice}>{inquiry.price}</span>
              <span style={{ float: 'right' }}>{humanizeTime(inquiry.updatedAt)}</span>
            </div>
            }
        >
          <Link className={classes.title} to={`/inquiry/${inquiry.objectId}`}>{inquiry.name}<small> {inquiry.quantity}</small></Link>
        </ListItemContent>
        <ListItemAction className={classes.actions}>
          { actions && actions.indexOf('edit') > -1 && <Link to={`/inquiry/${inquiry.objectId}?edit=true`}><Button colored>修改</Button></Link>}
          { actions && actions.indexOf('withdraw') > -1 && <Button>撤销</Button>}
          { actions && actions.indexOf('view') > -1 && <Link to={`/inquiry/${inquiry.objectId}`}><Button colored raised>查看详情</Button></Link>}
        </ListItemAction>
      </ListItem>
      ))}
  </List>
  );

InquiryList.propTypes = {
  hideUser: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  inquiries: PropTypes.array.isRequired,
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
  },
  subTitle: {
    overflow: 'hidden',
    '& > span': {
      marginRight: '2em',
    },
  },
  actions: {
    [breakpoints.mediaTabletBelow]: {
      display: 'none !important',
    },
  },
})(InquiryList);
