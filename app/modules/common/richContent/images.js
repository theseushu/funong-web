import React, { PropTypes } from 'react';
import FilesUpload from '../../common/filesUpload';

const Images = ({ images, ...props }) => (
  <FilesUpload files={images} {...props} />
);

Images.propTypes = {
  images: PropTypes.array,
};

export default Images;
