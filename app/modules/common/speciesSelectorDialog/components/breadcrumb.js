import React, { PropTypes } from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

const BreadcrumbComponent = ({ catalogType, catalog, category, species, onClick }) => (
  <Breadcrumb>
    {
      catalog && (<Breadcrumb.Item
        active={false}
        onClick={(e) => {
          e.preventDefault();
          onClick({ catalogType });
        }
        }
      >
        {catalogType}
      </Breadcrumb.Item>)
    }
    {
      catalog && (<Breadcrumb.Item
        active={!category}
        onClick={!category ? null : (e) => {
          e.preventDefault();
          onClick({ catalogType, catalog });
        }
        }
      >
        {catalog.name}
      </Breadcrumb.Item>)
    }
    {
      category && (<Breadcrumb.Item
        active
        onClick={species ? null : (e) => {
          e.preventDefault();
          onClick({ catalogType, catalog, category });
        }
        }
      >
        {category.name}
      </Breadcrumb.Item>)
    }
  </Breadcrumb>
);

BreadcrumbComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  species: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }),
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }),
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }),
  catalogType: PropTypes.string.isRequired,
};

export default BreadcrumbComponent;
