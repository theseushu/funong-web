import React, { PropTypes } from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import injectSheet from 'react-jss';
import Images from './images';

const richContent = ({ richContent: { text, images }, textLabel, sheet: { classes }, editing, onTextChange, onImagesChange, allowGallery }) => (
  <div>
    {
      (editing || images.length > 0) && (
        <div className={classes.marginTop}>
          <Images editing={editing} images={images} onChange={onImagesChange} allowGallery={allowGallery} />
        </div>
      )
    }
    {
      editing && (
        <div className={classes.marginTop}>
          <small>文字内容</small>
        </div>
      )
    }
    <div>
      {
        editing ? (
          <Textfield
            style={{ width: '100%', boxSizing: 'border-box' }} rows={4}
            label={textLabel || '点击开始输入'} maxLength={20000}
            value={text} autoFocus onChange={(e) => onTextChange(e.target.value)}
          />
        ) : (text.length > 0 && <div className={classes.marginTop}>{text}</div>)
      }
    </div>
  </div>
);

richContent.propTypes = {
  richContent: PropTypes.shape({
    text: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
  }).isRequired,
  sheet: PropTypes.object.isRequired,
  onImagesChange: PropTypes.func,
  onTextChange: PropTypes.func,
  editing: PropTypes.bool,
  textLabel: PropTypes.string,
  allowGallery: PropTypes.bool,
};

export default injectSheet({
  marginTop: {
    marginTop: 16,
  },
})(richContent);
