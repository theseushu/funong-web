import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const BreadcrumbComponent = ({ catalogType, catalog, onClick, sheet: { classes } }) => (
  <div className={classes.wrapper}>
    {
      catalog && (
        <a
          href="#_non_existing_"
          onClick={(e) => {
            e.preventDefault();
            onClick({ catalogType });
          }
          }
        >
          {catalogType}
        </a>)
    }
    <span>{'>'}</span>
    {
      catalog && (<span>{catalog.name}</span>)
    }
  </div>
);

BreadcrumbComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }),
  catalogType: PropTypes.string.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    textAlign: 'left',
    paddingTop: 16,
  },
})(BreadcrumbComponent);
