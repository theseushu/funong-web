import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Dialog, DialogContent, DialogActions, DialogTitle } from 'react-mdl/lib/Dialog';
import Button from 'react-mdl/lib/Button';

const DialogComponent = ({ title, fixedContent, scrollableContent, sheet: { classes }, show = true, onHide, onCancel, submit }) => {
  // The dialog focuses on first focusable element automatically, its anoyying. this firstAnchor is not really visible, it shall be focused without affecting any display styles
  const firstAnchor = <a href="#_non_existing_" />; // eslint-disable-line
  return (
    <Dialog open={show} onCancel={onHide} className={classes.modal}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        {firstAnchor}
        <div className={classes.fixedContent}>
          {fixedContent}
        </div>
        <div className={classes.scrollableContent}>
          {scrollableContent}
        </div>
      </DialogContent>
      <DialogActions>
        {submit && <Button colored onClick={submit.onSubmit} disabled={submit.disabled}>确定</Button>}
        <Button colored onClick={onCancel}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}

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
  sheet: PropTypes.object.isRequired,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  submit: PropTypes.shape({
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
  }),
};

export default injectSheet({
  modal: {
    maxWidth: 500, width: '100%', height: '100vh', minHeight: 400, maxHeight: 600, boxSizing: 'border-box',
  },
  modalBody: {
    boxSizing: 'border-box',
    height: 'calc(100vh - 140px)', // dialog padding 32 + button line 52 + title 56
    maxHeight: 460,
    minHeight: 260,
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
    flex: 1,
    overflowY: 'auto',
  },
})(DialogComponent);
