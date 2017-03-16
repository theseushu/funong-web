import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-modal';
import Button from 'react-mdl/lib/Button';
import { colors, breakpoints } from '../styles';

const SimpleDialog = ({ title, content, className, classes, show = true, onHide, onCancel, submit }) =>  (
  <Modal
    isOpen={show}
    onRequestClose={onHide}
    contentLabel="Modal"
    overlayClassName={classes.overlay}
    className={`${classes.modal} shadow--5 ${className}`}
  >
    <h4 className={classes.modalTitle}>
      {title}
    </h4>
    <div className={classes.modalBody}>
      {content}
    </div>
    <div className={classes.actions}>
      <Button colored onClick={(e) => { e.preventDefault(); onCancel(); }}>取消</Button>
      {submit && <Button colored onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
    </div>
  </Modal>
);
SimpleDialog.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  content: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  submit: PropTypes.shape({
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
  }),
};

export default injectSheet({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // react-modal settings above
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // react-modal settings above
    backgroundColor: 'white',
    maxWidth: 500,
    width: '100vw',
    maxHeight: '90vh',
    overflowY: 'scroll',
    [breakpoints.mediaTabletBelow]: {
      maxHeight: '100vh',
    },
  },
  modalTitle: {
    padding: '24px 16px 16px',
    margin: 0,
    color: 'black',
  },
  modalBody: {
    color: colors.colorSubTitle,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
  },
  actions: {
    padding: '8px 16px',
    textAlign: 'right',
  },
})(SimpleDialog);
