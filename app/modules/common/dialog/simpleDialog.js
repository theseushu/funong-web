import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-modal';
import Button from 'react-mdl/lib/Button';
import { colors } from '../styles';

const SimpleDialog = ({ title, content, className, classes, show = true, onHide, onCancel, submit }) => (
  <Modal
    tabIndex={null}
    isOpen={show}
    onRequestClose={onHide}
    contentLabel="Modal"
    overlayClassName={classes.overlay}
    shouldCloseOnOverlayClick
    className={`${classes.modal} ${className}`}
  >
    <Button style={{ position: 'absolute', top: 16, right: 16 }} onClick={(e) => { e.preventDefault(); onCancel(); }}>关闭</Button>
    <div className={classes.content}>
      <h4 className={classes.modalTitle}>
        {title}
      </h4>
      <div className={classes.modalBody}>
        {content}
      </div>
      <div className={classes.actions}>
        {submit && <Button colored onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
        <Button colored onClick={(e) => { e.preventDefault(); onCancel(); }}>取消</Button>
      </div>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    // react-modal settings above
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    // react-modal settings above
    border: 0,
    outline: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll',
  },
  content: {
    width: '100%',
    margin: 'auto',
    maxWidth: 800,
  },
  modalTitle: {
    padding: '32px 16px 16px',
    margin: 0,
    color: 'black',
  },
  modalBody: {
    color: colors.colorSubTitle,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  actions: {
    padding: '8px 16px',
    textAlign: 'right',
  },
})(SimpleDialog);
