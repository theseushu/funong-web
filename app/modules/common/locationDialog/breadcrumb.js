import React, { PropTypes } from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

const BreadcrumbComponent = ({ location: { country, province, city, district }, locationSelected }) => (
  !country ? null : (
    <Breadcrumb>
      {
      country && (<Breadcrumb.Item
        active={!province}
        onClick={(e) => {
          e.preventDefault();
          locationSelected({ country });
        }
        }
      >
        {country}
      </Breadcrumb.Item>)
    }
      {
      province && (<Breadcrumb.Item
        active={!city}
        onClick={(e) => {
          e.preventDefault();
          locationSelected({ country, province });
        }
        }
      >
        {province}
      </Breadcrumb.Item>)
    }
      {
      city && (<Breadcrumb.Item
        active={!district}
        onClick={(e) => {
          e.preventDefault();
          locationSelected({ country, province, city });
        }
        }
      >
        {city}
      </Breadcrumb.Item>)
    }
    </Breadcrumb>
  )
);

BreadcrumbComponent.propTypes = {
  location: PropTypes.shape({
    country: PropTypes.string,
    province: PropTypes.string,
    city: PropTypes.string,
    district: PropTypes.string,
  }),
  locationSelected: PropTypes.func.isRequired,
};

export default BreadcrumbComponent;
