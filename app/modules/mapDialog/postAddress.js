import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import { currentUserSelector } from 'modules/data/ducks/selectors';

const PostAddress = ({ location, onChange }) => {
  const { address, contact, postCode, phone } = location;
  return (
    <div>
      <Textfield
        floatingLabel
        label="详细地址(可编辑)"
        name="_address_details"
        rows={2}
        style={{ width: '100%' }}
        value={address.details}
        onChange={(e) => onChange({ ...location, address: { ...address, details: e.target.value } })}
      />
      <Textfield
        floatingLabel
        label="邮编"
        name="postCode"
        style={{ width: '100%' }}
        value={postCode}
        onChange={(e) => onChange({ ...location, postCode: e.target.value })}
      />
      <Textfield
        floatingLabel
        label="联系人"
        name="_user_name"
        style={{ width: '100%' }}
        value={contact}
        required
        onChange={(e) => onChange({ ...location, contact: e.target.value })}
      />
      <Textfield
        floatingLabel
        label="联系电话"
        name="_phoneInput"
        style={{ width: '100%' }}
        value={phone}
        required
        onChange={(e) => onChange({ ...location, phone: e.target.value })}
      />
    </div>
  );
};

PostAddress.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.shape({
      country: PropTypes.string,
      province: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      details: PropTypes.string,
    }),
    contact: PropTypes.string,
    postCode: PropTypes.string,
    phone: PropTypes.string,
  }),
  onChange: PropTypes.func,
};
export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(injectSheet({})(PostAddress));
