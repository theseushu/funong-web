import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const styles = {
  modalBody: {
    maxHeight: 'calc(100vh - 182px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  fixedContent: {
    borderBottom: 'solid 1px grey',
  },
  scrollableContent: {
    paddingTop: 15,
    flex: 1,
    overflowY: 'auto',
  },
};

const Dialog = ({ title, fixedContent, scrollableContent, sheet: { classes }, show = true, onHide, onCancel, submit }) => (
  <Modal show={show} backdrop={false} onHide={onHide}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={classes.modalBody}>
      <div className={classes.fixedContent}>
        {fixedContent}
      </div>
      <div className={classes.scrollableContent}>
        {scrollableContent}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onCancel}>取消</Button>
      {submit && <Button onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
    </Modal.Footer>
  </Modal>
);

Dialog.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  fixedContent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  scrollableContent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func, PropTypes.element,
  ]),
  sheet: PropTypes.object.isRequired,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  submit: PropTypes.shape({
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
  }),
};

export default injectSheet(styles)(Dialog);
