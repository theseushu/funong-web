import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { actions } from 'modules/mapDialog/ducks';
import styles, { colors } from 'modules/common/styles';
import ButtonWithIcon from 'modules/common/buttons/ButtonWithIcon';
import { locationThumbnail } from 'funong-common/lib/utils/mapUtils';

const generateThumbnailDiv = (lnglat, className) => {
  const { url, thumbnail } = locationThumbnail(lnglat);
  return (
    <div className={className}>
      <a href={url} target="_blank">
        <img src={thumbnail} role="presentation" />
      </a>
    </div>
  );
};

const LocationField = ({ input: { value, onChange }, meta: { error }, openDialog, sheet: { classes } }) => (
  <div style={{ width: '100%' }}>
    <div className={classes.title} style={{ color: error ? colors.colorError : undefined }}>
      地址
      <ButtonWithIcon
        colored icon="edit_location"
        onClick={(e) => {
          e.preventDefault();
          openDialog({
            onSubmit: onChange,
            detailsEditable: true,
            location: value === '' ? null : value,
          });
        }}
      >{value === '' ? '点此选择' : '点此修改'}</ButtonWithIcon>
    </div>
    {
      value.lnglat && generateThumbnailDiv(value.lnglat, classes.thumbnail)
    }
    <p className={styles.colorSubTitle}>
      {value === '' ? '' : value.address.details}
    </p>
  </div>
);

LocationField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default connect(
  null,
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet({
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    '& > img': {
      maxWidth: 300,
      width: '100%',
    },
  },
})(LocationField));
