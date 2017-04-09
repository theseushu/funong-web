import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import IconButton from 'react-mdl/lib/IconButton';
import { CardActions } from 'react-mdl/lib/Card';
import { Enable as EnableButton, Disable as DisableButton, Remove as RemoveButton } from 'modules/common/product/buttons';
import { canEnable, canDisable } from 'utils/productUtils';

const Actions = ({ type, product, actions, editPath, className }) => actions && actions.length > 0 ? (
  <CardActions className={className} border>
    {actions.indexOf('enable') > -1 && canEnable(product) && <EnableButton key={0} type={type} product={product} />}
    {actions.indexOf('disable') > -1 && canDisable(product) && <DisableButton key={0} type={type} product={product} />}
    {actions.indexOf('edit') > -1 && <Link key={1} to={`/${editPath}/${product.objectId}?edit=true`}><IconButton colored name="edit"></IconButton></Link>}
    {actions.indexOf('remove') > -1 && <RemoveButton key={2} type={type} product={product} />}
  </CardActions>
  ) : null;

Actions.propTypes = {
  editPath: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
  actions: PropTypes.array,
};

export default Actions;
