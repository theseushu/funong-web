import React, { PropTypes } from 'react';
import RichContent from 'modules/common/richContent';

const descAndImagesField = ({ desc, images }) => (
  <div>
    <RichContent
      richContent={{ desc: desc.input.value, images: images.input.value }}
      editing
      descLabel={''}
      onImagesChange={(newImages) => { images.input.onChange(newImages); }}
      onDescChange={(newDesc) => desc.input.onChange(newDesc)}
      allowGallery
    />
  </div>
  );

descAndImagesField.propTypes = {
  desc: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
};

export default descAndImagesField;
