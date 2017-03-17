import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-modal';
import Button from 'react-mdl/lib/Button';
import { colors, breakpoints } from '../styles';

const DialogComponent = ({ title, fixedContent, scrollableContent, classes, show = true, onHide, onCancel, submit, fixedHeight = true }) => (
  <Modal
    isOpen={show}
    onRequestClose={onHide}
    contentLabel="Modal"
    overlayClassName={classes.overlay}
    className={`${classes.modal} shadow--5`}
  >
    <h4 className={classes.modalTitle}>
      {title}
    </h4>
    <div className={`${classes.modalBody}${fixedHeight ? ' ' : ''}${fixedHeight ? classes.fixedHeightBody : ''}`}>
      {fixedContent && <div className={classes.fixedContent}>
        {fixedContent}
      </div>}
      {scrollableContent && <div className={classes.scrollableContent}>
        {scrollableContent}
      </div>}
    </div>
    <div className={classes.actions}>
      {submit && <Button colored onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
      <Button colored onClick={(e) => { e.preventDefault(); onCancel(); }}>取消</Button>
    </div>
  </Modal>
    );

DialogComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  fixedContent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  scrollableContent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  fixedHeight: PropTypes.bool,
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
    maxWidth: 600,
    width: '100vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
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
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '0 16px',
  },
  fixedHeightBody: {
  },
  fixedContent: {
    borderBottom: 'solid 1px lightgray',
    paddingBottom: 15,
  },
  scrollableContent: {
    flex: 1,
    overflowY: 'auto',
  },
  actions: {
    padding: '8px 16px',
    textAlign: 'right',
  },
})(DialogComponent);
