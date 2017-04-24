import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import { formatAddress } from 'funong-common/lib/utils/displayUtils';

const Location = ({ detailsEditable, location, onChange }) => {
  const { address } = location;
  return (
    <div>
      <h5 style={{ marginBottom: 0 }}>
        {formatAddress(address)}
      </h5>
      {
        detailsEditable ? (
          <Textfield
            floatingLabel
            label="详细地址(可编辑)"
            name="_address_details"
            rows={2}
            style={{ width: '100%' }}
            value={address.details}
            onChange={(e) => onChange({ ...location, address: { ...address, details: e.target.value } })}
          />
        ) : (
          <p style={{ marginTop: 16 }}>
            {address.details}
          </p>
        )
      }
    </div>
  );
};
Location.propTypes = {
  detailsEditable: PropTypes.bool,
  location: PropTypes.shape({
    lnglat: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    address: PropTypes.shape({
      country: PropTypes.string,
      province: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      details: PropTypes.string,
    }),
  }),
  onChange: PropTypes.func,
};
export default injectSheet({})(Location);
