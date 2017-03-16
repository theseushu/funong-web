import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field } from 'redux-form';
import injectSheet from 'react-jss';
import { actions } from 'modules/mapDialog/ducks';
import styles, { colors } from 'modules/common/styles';
import ButtonWithIcon from 'modules/common/buttons/ButtonWithIcon';
import { locationThumbnail } from 'utils/mapUtils';
import { required } from './validations';

const generateThumbnailDiv = (lnglat, className, name) => {
  const { url, thumbnail } = locationThumbnail(lnglat, name);
  return (
    <div className={className}>
      <a href={url} target="_blank">
        <img src={thumbnail} role="presentation" />
      </a>
    </div>
  );
};

const Location = ({ input: { value, onChange }, meta: { error }, openDialog, name, sheet: { classes } }) => {
  return (
    <div className={styles.w100}>
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
        value.lnglat && generateThumbnailDiv(value.lnglat, classes.thumbnail, name)
      }
      <p className={styles.colorSubTitle}>
        {value === '' ? '' : value.address.details}
      </p>
    </div>
  );
}

Location.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const LocationField = connect(
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
})(Location));

export default ({ ...props }) => <Field name="location" validate={[required]} component={LocationField} props={{ ...props }} />;
