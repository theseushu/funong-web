import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import SimpleDialog from './simpleDialog';

const DialogComponent = ({ title, fixedContent, scrollableContent, classes, show = true, onHide, onCancel, submit, fixedHeight = true }) => (
  <SimpleDialog
    show={show}
    onHide={onHide}
    onCancel={onCancel}
    submit={submit}
    title={title}
    content={
      <div className={classes.content}>
        {fixedContent && <div className={classes.fixedContent}>
          {fixedContent}
        </div>}
        {scrollableContent && <div className={classes.scrollableContent}>
          {scrollableContent}
        </div>}
      </div>
    }
  />
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
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeightBody: {
  },
  fixedContent: {
    borderBottom: 'solid 1px lightgray',
    paddingBottom: 15,
  },
  scrollableContent: {
    flex: 1,
  },
  actions: {
    padding: '8px 16px',
    textAlign: 'right',
  },
})(DialogComponent);
