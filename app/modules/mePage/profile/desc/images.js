import React, { PropTypes } from 'react';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import FilesUpload from '../../../common/filesUpload';

const Images = ({ images, onChange, editing }) => (
  <div>
    { editing &&
      <div>
        <small style={{ lineHeight: '32px' }}>图片</small>
        <Tooltip
          label={
            <div>
              <div>点击 <Icon name="add" style={{ fontSize: 10 }} /> 按钮添加图片</div>
              <div>拖拽图片到 <Icon name="delete_sweep" style={{ fontSize: 10 }} /> 删除图片</div>
              <div>您也可以拖拽交换图片的位置</div>
              <div>单击图片可预览</div>
            </div>
          }
        >
          <IconButton colored name="help_outline"></IconButton>
        </Tooltip>
      </div>
    }
    <FilesUpload files={images} onChange={onChange} editing={editing} />
  </div>
);

Images.propTypes = {
  images: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

export default Images;
