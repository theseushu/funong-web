import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const styles = {
  modalBody: {
    maxHeight: 'calc(100vh - 212px)',
    minHeight: 180,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  fixedContent: {
    borderBottom: 'solid 1px lightgray',
    paddingBottom: 15,
    '& ol': {
      marginTop: 15,
      marginBottom: '0 !important',
    },
  },
  scrollableContent: {
    paddingTop: 15,
    flex: 1,
    overflowY: 'auto',
  },
};

const Dialog = ({ title, fixedContent, scrollableContent, sheet: { classes }, show = true, onHide, onCancel, submit }) => (
  <Modal show={show} backdrop={false} onHide={onHide}>
    <Modal.Header closeButton>
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
    {submit &&
      <Modal.Footer>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>
      </Modal.Footer>
    }
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
