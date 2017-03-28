import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import Layout from 'modules/common/layout';
import { inquiriesSelector } from 'modules/data/ducks/selectors';
import Form from './form';
import Display from './display';

const EMPTY = {
  category: null,
  species: null,
  name: '',
  location: null,
  desc: '',
  endAt: (Math.floor(new Date().getTime() / 86400000) + 7) * 86400000, // start time of 7 days later
  price: '面议',
  range: [],
};
const Page = ({ inquiry, params: { id }, location: { query } }) => (
  <Layout
    content={
        (id === 'new' || query.edit) ?
          <Form initialValues={inquiry || EMPTY} /> : <Display inquiry={inquiry} />
      }
    smallContent={id === 'new' || !!query.edit}
  >
  </Layout>
  );

Page.propTypes = {
  location: PropTypes.object.isRequired,
  inquiry: PropTypes.object,
  params: PropTypes.object,
};

export default connect(
  (state, { params: { id } }) => ({
    inquiry: id === 'new' ? null : _find(inquiriesSelector(state), ({ objectId }) => objectId === id),
  }),
)(Page);
