import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { List, ListItem, ListItemContent } from 'react-mdl/lib/List';
import Button from 'react-mdl/lib/Button';

const types = [
  { icon: 'shopping_basket', title: '逛逛再说', value: '一般用户', subtitle: '您可以稍候在个人信息里重新选择' },
  { icon: 'home', title: '我要开店', value: '微店店主' },
  { icon: 'shopping_cart', title: '农产农资收购', value: '农产农资收购' },
  { icon: 'store_mall_directory', title: '农产农资供货', value: '农产农资供货' },
  { icon: 'local_shipping', title: '物流', value: '物流供应商' },
  { icon: 'headset_mic', title: '注册农贸专家', value: '农贸专家' },
];

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
