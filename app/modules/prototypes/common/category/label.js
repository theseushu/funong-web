import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Chip } from 'react-mdl/lib/Chip';

const CategoryLabel = ({ onClose, children }) => (
  <Chip style={{ background: '#FFECB3' }}onClose={onClose}>{children}</Chip>
);

CategoryLabel.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.any.isRequired,
};

export default injectSheet({})(CategoryLabel);
