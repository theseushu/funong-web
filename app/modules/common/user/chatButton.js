import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions } from 'modules/chat/ducks';

const ChatButton = ({ currentUser, user, createConversation, openDialog, children, ...props }, { router }) => (
  <Button
    {...props}
    disabled={currentUser && currentUser.objectId === user.objectId}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!currentUser) {
        router.push('/login');
      } else {
        createConversation({ currentUser, user });
        openDialog(user);
      }
    }}
  >{children || '在线联系'}</Button>
  );

ChatButton.propTypes = {
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  children: PropTypes.any,
  createConversation: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};
ChatButton.contextTypes = {
  router: PropTypes.object.isRequired,
};

const createConversationAction = actions.createConversation;
const openDialogAction = actions.openDialog;
export default connect(
  (state) => ({ currentUser: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ createConversation: createConversationAction, openDialog: openDialogAction }, dispatch),
)(ChatButton);
