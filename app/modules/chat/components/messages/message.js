import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Avatar from 'modules/common/user/avatar';
import messageSending from '../../assets/messageSending.gif';

const TextMessage = ({ user, message, mine = false, storeKey, retry, classes }) => {
  const { text, error } = message;
  const sending = mine && storeKey && !error;
  const failed = mine && storeKey && error;
  return (
    <div className={`${classes.message} ${mine ? classes.mine : ''} ${failed ? classes.failed : ''}`}>
      <Avatar user={user} className={classes.avatar} />
      <div className={classes.content}>
        <div className={`${classes.triangleBorder} ${classes.tbBorder}`} />
        <div className={`${classes.triangleBorder} ${classes.tbBackground}`} />
        { sending && <div className={classes.sending}><img src={messageSending} role="presentation" /></div> }
        { failed && <div className={classes.retry}>
          <Button
            accent
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              retry({ message, meta: { storeKey } });
            }}
          >
              重试
            </Button>
          </div>
        }
        { text.split('\n').map((line, i) => <p className={classes.p} key={i}>{line}</p>) }
      </div>
    </div>
  );
};

TextMessage.propTypes = {
  mine: PropTypes.bool.isRequired,
  storeKey: PropTypes.string,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  retry: PropTypes.func.isRequired,
};

export default injectSheet({
  message: {
    display: 'flex',
    maxWidth: '100%',
    padding: 8,
    fontSize: 16,
    lineHeight: '20px',
    color: 'black',
    justifyContent: 'flex-start',
    '& p': {
      maxWidth: '100%',
      wordWrap: 'break-word',
      margin: 0,
    },
  },
  mine: {
    justifyContent: 'flex-end',
    '& > $avatar': {
      order: 2,
    },
    '& > $content': {
      order: 1,
      margin: '0 16px 0 64px',
      background: '#AED581', // lightgreen300
      border: 'solid 1px #7CB342', // lightgreen700
    },
    '&  $tbBorder': {
      left: 'auto',
      right: -17, // why 17? I dont know either...
      borderStyle: 'dashed dashed dashed solid',
      borderColor: 'transparent transparent transparent #7CB342',
    },
    '&  $tbBackground': {
      left: 'auto',
      right: -16, // why 16? I dont know either...
      borderStyle: 'dashed dashed dashed solid',
      borderColor: 'transparent transparent transparent #AED581',
    },
  },
  failed: {
    '& > $content': {
      background: '#FFAB91', // deepOrange200
      border: 'solid 1px #FF7043', // deepOrange400
    },
    '&  $tbBorder': {
      borderColor: 'transparent transparent transparent #FF7043',
    },
    '&  $tbBackground': {
      borderColor: 'transparent transparent transparent #FFAB91',
    },
  },
  content: {
    maxWidth: 'calc(100% - 120px)',
    boxSizing: 'border-box',
    position: 'relative',
    padding: '8px 12px',
    borderRadius: 5,
    margin: '0 64px 0 16px',
    border: 'solid 1px #EEEEEE',
    background: 'white',
  },
  triangleBorder: {
    position: 'absolute',
    top: 12,
    overflow: 'hidden',
    width: 0,
    height: 0,
    borderWidth: 8,
  },
  tbBorder: {
    left: -17, // why 17? I dont know either...
    borderStyle: 'dashed solid dashed dashed',
    borderColor: 'transparent #EEEEEE transparent transparent',
  },
  tbBackground: {
    left: -16, // why 16? I dont know either...
    borderStyle: 'dashed solid dashed dashed',
    borderColor: 'transparent white transparent transparent',
  },
  sending: {
    position: 'absolute',
    left: -20,
  },
  retry: {
    position: 'absolute',
    left: -64,
    top: 0,
  },
  avatar: {
    width: 40,
    height: 40,
  },
})(TextMessage);
