import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Fields } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import RadioGroup from 'react-mdl/lib/RadioGroup';
import Radio from 'react-mdl/lib/Radio';
import styles, { colors } from 'modules/common/styles';
import { createTextField, ImagesField } from 'modules/common/form';

const NameField = createTextField('name', '企业名称', 10);
const CorporateField = createTextField('corporate', '法人代表', 30);
const UnifiedCodeField = createTextField('unifiedCode', '社会统一信用代码', 30);
const RegistrationCodeField = createTextField('registrationCode', '营业执照号码', 30);
const CooperationCodeField = createTextField('cooperationCode', '组织机构代码证号码', 30);

const IsUnifiedField = ({ input: { value, onChange } }) => (
  <RadioGroup name="isNew" value={value} onChange={onChange}>
    <Radio value="" ripple>三证和一执照</Radio>
    <Radio value="old" ripple>旧版营业执照</Radio>
  </RadioGroup>
  );
IsUnifiedField.propTypes = {
  input: PropTypes.object,
};

const UnifiedFields = ({ isUnified, unifiedCode, registrationCode, cooperationCode, sheet: { classes } }) => {
  const unified = (isUnified.input.value === '');
  return (
    <div className={classes.marginTop16}>
      <div><IsUnifiedField {...isUnified} /></div>
      {unified && (
        <div className={classes.line}>
          <div className={classes.input}>
            <UnifiedCodeField {...unifiedCode} />
          </div>
          <h5 style={{ margin: 0 }}><small>请输入统一社会信用代码（与证件保持一致）</small></h5>
        </div>
      )}
      {!unified && (
        <div className={classes.line}>
          <div className={classes.input}>
            <RegistrationCodeField {...registrationCode} />
          </div>
          <h5 style={{ margin: 0 }}><small>请输入营业执照号码（与证件保持一致）</small></h5>
        </div>
      )}
      {!unified && (
        <div className={classes.line}>
          <div className={classes.input}>
            <CooperationCodeField {...cooperationCode} />
          </div>
          <h5 style={{ margin: 0 }}><small>请输入组织机构代码（与证件保持一致）</small></h5>
        </div>
      )}
      <small style={{ color: colors.colorAccent, marginBottom: 0, marginTop: 16 }}>
        {unified ? '三证合一的企业请上传有效的统一社会信用代码证件照' : '非三证合一企业请上传有效营业执照和组织机构代码证件，两证需齐全'}
      </small>
    </div>
  );
};
UnifiedFields.propTypes = {
  isUnified: PropTypes.object,
  unifiedCode: PropTypes.object,
  registrationCode: PropTypes.object,
  cooperationCode: PropTypes.object,
  sheet: PropTypes.object.isRequired,
};

// export for unit testing
const companyCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.line}>
        <div className={classes.input}>
          <NameField />
        </div>
        <h5 style={{ margin: 0 }}><small>请输入企业名称（与证件保持一致）</small></h5>
      </div>
      <div className={classes.line}>
        <div className={classes.input}>
          <CorporateField />
        </div>
        <h5 style={{ margin: 0 }}><small>法人代表姓名（与证件保持一致）</small></h5>
      </div>
      <Fields names={['isUnified', 'unifiedCode', 'registrationCode', 'cooperationCode']} component={UnifiedFields} sheet={{ classes }} />
      <ImagesField title="证件照片" />
      <div className={[styles.contentCenter, classes.marginTop16].join(' ')}>
        <Button raised colored type="submit" disabled={pristine || invalid || submitting}>{submitSucceeded ? '保存成功' : '确定'}</Button>
      </div>
    </form>
  );
};

companyCertForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  marginTop16: {
    marginTop: 16,
  },
  line: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
  },
  input: {
    flex: 1,
  },
})(companyCertForm);
