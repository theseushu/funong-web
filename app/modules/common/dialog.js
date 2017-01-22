import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Dialog, DialogContent, DialogActions, DialogTitle } from 'react-mdl/lib/Dialog';
import Button from 'react-mdl/lib/Button';

const DialogComponent = ({ title, fixedContent, scrollableContent, sheet: { classes }, show = true, onHide, onCancel, submit }) => (
  <Dialog open={show} onCancel={onHide} style={{ maxWidth: 500, width: '100%', height: 'calc(100vh - 48px)', minHeight: 400, boxSizing: 'border-box' }}>
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogContent className={classes.modalBody}>
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
})(DialogComponent);
