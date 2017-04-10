import React, { PropTypes } from 'react';
import Page, { NoResult } from 'modules/common/page';
import { publishTypesInfo } from 'appConstants';
import DefaultList from '../list';

const PublishPage = ({ type, pending, page, onPageChange, actions, List }) => (
  <Page
    pending={pending}
    page={page}
    onPageChange={onPageChange}
    empty={<NoResult icon={publishTypesInfo[type].icon} title={`没有找到相关${publishTypesInfo[type].title}`} />}
    List={({ entries }) => List ? <List type={type} entries={entries} actions={actions} /> : <DefaultList type={type} entries={entries} actions={actions} />}
  />
  );

PublishPage.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
  pending: PropTypes.bool,
  actions: PropTypes.array,
  List: PropTypes.func,
};

export default PublishPage;
