import React, { Component, PropTypes } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';
import injectSheet from 'react-jss';
import { Dialog, DialogContent, DialogActions, DialogTitle } from 'react-mdl/lib/Dialog';
import Button from 'react-mdl/lib/Button';
import { findDOMNode } from 'react-dom';
import { breakpoints } from '../styles';

class DialogComponent extends Component {
  static propTypes = {
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
  }
  componentDidMount() {
    const dialog = findDOMNode(this);
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      dialogPolyfill.registerDialog(dialog);
    }
  }
  render() {
    const { title, fixedContent, scrollableContent, classes, show = true, onHide, onCancel, submit, fixedHeight = true } = this.props;const firstAnchor = <a href="#_non_existing_" />; // eslint-disable-line
    return (
      <Dialog open={show} onCancel={onHide} className={`${classes.modal}`}>
        <DialogTitle className={classes.modalTitle}>
          {title}
        </DialogTitle>
        <DialogContent className={`${classes.modalBody}${fixedHeight ? ' ' : ''}${fixedHeight ? classes.fixedHeightBody : ''}`}>
          {firstAnchor}
          {fixedContent && <div className={classes.fixedContent}>
            {fixedContent}
          </div>}
          {scrollableContent && <div className={classes.scrollableContent}>
            {scrollableContent}
          </div>}
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
    maxWidth: 600,
    width: '100%',
    boxSizing: 'border-box',
    [breakpoints.mediaTabletBelow]: {
      padding: 0,
    },
  },
  modalTitle: {
    [breakpoints.mediaTabletBelow]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  modalBody: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.mediaTabletBelow]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  fixedHeightBody: {
    height: 'calc(100vh - 108px)', // dialog button line 52 + title 56
    maxHeight: 460,
    minHeight: 260,
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
    flex: 1,
    overflowY: 'auto',
  },
})(DialogComponent);
