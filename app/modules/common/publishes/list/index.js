import React, { PropTypes } from 'react';
import { publishTypes } from 'funong-common/lib/appConstants';
import CardList from './cardList';
import InquiryList from './inquiryList';
const debug = require('debug')('funong-web:common:publishes:list');

const lists = {
  [publishTypes.supply]: CardList,
  [publishTypes.logistics]: (props) => <CardList column={3} {...props} />,
  [publishTypes.trip]: CardList,
  [publishTypes.product]: CardList,
  [publishTypes.inquiry]: InquiryList,
  [publishTypes.flashSale]: CardList,
};

if (Object.keys(lists).length !== Object.keys(publishTypes).length) {
  debug('Missing lists for publish types');
}

const List = ({ type, ...props }) => {
  const ListComponent = lists[type];
  return (
    <ListComponent type={type} {...props} />
  );
};
List.propTypes = {
  type: PropTypes.oneOf(Object.values(publishTypes)).isRequired,
};
export default List;
