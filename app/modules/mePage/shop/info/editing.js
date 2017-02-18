import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
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
}

export default injectSheet({
  wrapper: {
    maxWidth: 580, margin: '0 auto', padding: 16,
  },
})(Editing);
