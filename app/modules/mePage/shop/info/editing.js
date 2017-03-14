import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import createForm from './form/createForm';


const Editing = ({ classes, shop }) => {
  const Form = createForm(shop);
  return (
    <div className={classes.wrapper}>
      <Form />
    </div>
  );
};

Editing.propTypes = {
  classes: PropTypes.object,
  shop: PropTypes.object,
};

export default injectSheet({
  wrapper: {
    width: 580, maxWidth: '100%', margin: '0 auto', padding: 16,
  },
})(Editing);
