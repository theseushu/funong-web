import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import { Avatar } from 'modules/common/avatar';
import FilesUpload from 'modules/common/filesUpload';

const Comment = ({ classes, comment }) => (
  <div className={classes.comment}>
    <div className={classes.user} href={`/user/${comment.owner.objectId}`}>
      <span className="_user">
        <Avatar user={comment.owner} />
      </span>
      <span className="_name">{comment.owner.name}</span>
    </div>
    <div className={classes.content}>
      {comment.desc.split('\n').map((p, i) => <p key={i}>{p}</p>)}
      <FilesUpload editing={false} files={comment.images} allowGallery small />
    </div>
  </div>
);

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

export default injectSheet({
  comment: {
    width: '100%',
    display: 'flex',
    marginBottom: 16,
    paddingTop: 16,
    borderTop: `solid 1px ${colors.colorLightGrey}`,
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 8,
    textDecoration: 'none',
    '& > ._user': {
      width: 30,
      height: 30,
    },
    '& > ._name': {
      overflow: 'hidden',
    },
  },
  content: {
    '& > p': {
      color: colors.colorText,
      marginBottom: 0,
      lineHeight: '16px',
    },
  },
})(Comment);
