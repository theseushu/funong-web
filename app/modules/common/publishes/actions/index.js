import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import IconButton from 'react-mdl/lib/IconButton';
import { canEnable, canDisable } from 'utils/publishUtils';
import { publishTypesInfo } from 'appConstants';
import { Enable as EnableButton, Disable as DisableButton, Remove as RemoveButton } from '../buttons';

const Actions = ({ type, publish, actions, className }) => actions && actions.length > 0 ? (
  <div className={className}>
    {actions.indexOf('enable') > -1 && canEnable(publish) && <EnableButton key={0} type={type} publish={publish} />}
    {actions.indexOf('disable') > -1 && canDisable(publish) && <DisableButton key={0} type={type} publish={publish} />}
    {actions.indexOf('edit') > -1 && <Link key={1} to={`/${publishTypesInfo[type].route}/${publish.objectId}?edit=true`}><IconButton colored name="edit"></IconButton></Link>}
    {actions.indexOf('remove') > -1 && <RemoveButton key={2} type={type} publish={publish} />}
  </div>
  ) : null;

Actions.propTypes = {
  type: PropTypes.string.isRequired,
  publish: PropTypes.object.isRequired,
  className: PropTypes.string,
  actions: PropTypes.array,
};

export default Actions;
