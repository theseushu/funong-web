import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import Icon from 'react-mdl/lib/Icon';
import Tooltip from 'react-mdl/lib/Tooltip';
import FilesUpload from '../../../common/filesUpload';
import { colors } from '../../../common/styles';

const imagesField = ({ sheet: { classes }, input: { value, onChange }, meta: { error } }) => (
  <div>
    <div className={classes.title} style={{ color: error ? colors.colorError : undefined }}>
      <small>图片</small>
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
        <IconButton colored={!error} name="help_outline" onClick={(e) => e.preventDefault()} ></IconButton>
      </Tooltip>
    </div>
    <FilesUpload files={value || []} onChange={onChange} editing />
  </div>
  );

imagesField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  title: { lineHeight: '32px', paddingTop: 20 },
})(imagesField);
