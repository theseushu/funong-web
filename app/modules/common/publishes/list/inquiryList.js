import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Menu from 'react-mdl/lib/Menu';
import IconButton from 'react-mdl/lib/IconButton';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Avatar } from 'modules/common/user';
import styles, { colors, breakpoints } from 'modules/common/styles';
import { briefAddress, humanizeTime } from 'utils/displayUtils';
import { publishTypes, publishTypesInfo } from 'appConstants';
import Actions from '../actions';

const type = publishTypes.inquiry;
const info = publishTypesInfo[type];

const InquiryList = ({ hideUser = false, classes, entries, actions }) => (
  <List className={hideUser ? `${classes.listWithoutAvatar} ${classes.list}` : classes.list}>
    {entries.map((inquiry, i) => (
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
          <Link className={classes.title} to={`/${info.route}/${inquiry.objectId}`}>{inquiry.name}<small> {inquiry.quantity}</small></Link>
        </ListItemContent>
        <ListItemAction>
          <div className={classes.buttonsDesktop}>
            <Actions type={type} publish={inquiry} actions={actions} />
          </div>
          {actions && actions.length > 0 && (
          <div className={classes.buttonsTouch}>
            <IconButton name="more_vert" id={`inquiry_${inquiry.objectId}_menu`} />
            <Menu target={`inquiry_${inquiry.objectId}_menu`} align="right">
              <Actions type={type} publish={inquiry} actions={actions} className={classes.verticalButtons} />
            </Menu>
          </div>
          )}
        </ListItemAction>
      </ListItem>
      ))}
  </List>
  );

InquiryList.propTypes = {
  hideUser: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
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
  buttonsDesktop: {
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  buttonsTouch: {
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
  verticalButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(InquiryList);
