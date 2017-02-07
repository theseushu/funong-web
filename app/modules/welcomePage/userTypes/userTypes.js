import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { List, ListItem, ListItemContent } from 'react-mdl/lib/List';
import Button from 'react-mdl/lib/Button';
import { userTypes as types } from '../../../appConstants/index';

const userTypes = ({ onClick, pending }) => (
  <List style={{ width: '300px' }}>
    {
      types.map((type, i) => (
        <ListItem key={i} threeLine={!!type.subtitle}>
          <ListItemContent avatar={type.icon} subtitle={type.subtitle}>
            <Button colored disabled={pending} onClick={() => onClick({ type: type.value })}>{type.title}</Button>
          </ListItemContent>
        </ListItem>
      ))
    }
  </List>
);

userTypes.propTypes = {
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool,
};

export default injectSheet({})(userTypes);
