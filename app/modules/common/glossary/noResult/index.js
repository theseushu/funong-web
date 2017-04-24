import React, { PropTypes } from 'react';
import { productTypes } from 'funong-common/lib/appConstants';
import NoResult from './noResult';

export default () => <NoResult icon="sentiment_dissatisfied" title="没有结果，请更换查询条件" />;

const messages = {
  [productTypes.supply]: { title: '该用户没有发布供应', titleMine: '您还没有发布供应', icon: 'shopping_basket' },
  [productTypes.trip]: { title: '该用户没有发布乡村游', titleMine: '您没有发布乡村游', icon: 'toys' },
  [productTypes.logistics]: { title: '该用户没有发布物流', titleMine: '您没有发布物流', icon: 'local_shipping' },
  [productTypes.shop]: { title: '该店铺尚无商品', titleMine: '您的店铺没有商品', icon: 'local_grocery_store' },
};

export const Product = ({ type, mine }) => <NoResult icon={messages[type].icon} title={mine ? messages[type].titleMine : messages[type].title} />;
Product.propTypes = {
  type: PropTypes.string.isRequired,
  mine: PropTypes.bool,
};

export const Inquiry = ({ mine }) => <NoResult icon="perm_phone_message" title={mine ? '您没有发布采购信息' : '该用户没有发布采购信息'} />;
Inquiry.propTypes = {
  mine: PropTypes.bool,
};
