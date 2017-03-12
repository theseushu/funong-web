import React, { Component, PropTypes } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';
import injectSheet from 'react-jss';
import { Dialog, DialogContent, DialogActions, DialogTitle } from 'react-mdl/lib/Dialog';
import Button from 'react-mdl/lib/Button';
import { findDOMNode } from 'react-dom';

class SimpleDialog extends Component {
  static propTypes = {
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
  }
  componentDidMount() {
    const dialog = findDOMNode(this);
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      dialogPolyfill.registerDialog(dialog);
    }
  }
  render() {
    const { title, content, className, classes, show = true, onHide, onCancel, submit } = this.props;
    return (
      <Dialog open={show} onCancel={onHide} className={`${classes.modal} ${className}`}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent className={classes.modalBody}>
          {content}
        </DialogContent>
        <DialogActions>
          <Button colored onClick={(e) => { e.preventDefault(); onCancel(); }}>取消</Button>
          {submit && <Button colored onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
        </DialogActions>
      </Dialog>
    );
  }
}


export default injectSheet({
  modal: {
    maxWidth: 500,
    width: '100%',
    boxSizing: 'border-box',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
  modalBody: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
})(SimpleDialog);
