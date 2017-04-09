import React, { PropTypes } from 'react';
import Page, { NoResult } from 'modules/common/page';
import { publishTypesInfo } from 'appConstants';
import List from '../list';

const PublishPage = ({ type, pending, page, onPageChange, actions }) => (
  <Page
    pending={pending}
    page={page}
    onPageChange={onPageChange}
    empty={<NoResult icon={publishTypesInfo[type].icon} title={`没有找到相关${publishTypesInfo[type].title}`} />}
    List={({ entries }) => <List type={type} entries={entries} actions={actions} />}
  />
  );

PublishPage.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
  pending: PropTypes.bool,
  actions: PropTypes.array,
};

export default PublishPage;
