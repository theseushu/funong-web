import React, { Component, PropTypes } from 'react';
import _isEqual from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { criteriaToApiParams } from 'modules/common/criteria/utils';
import List from 'modules/common/publishes/list';

export default (type, actions, selectors) => {
  class Recommends extends Component {
    static propTypes = {
      pending: PropTypes.bool,
      criteria: PropTypes.object.isRequired,
      publishes: PropTypes.array.isRequired,
      classes: PropTypes.object.isRequired,
      recommend: PropTypes.func.isRequired,
    }
    componentDidMount() {
      const { recommend, criteria } = this.props;
      recommend(criteriaToApiParams({ ...criteria, page: 1, pageSize: 4 }));
    }
    componentWillReceiveProps(newProps) {
      const { recommend, criteria } = newProps;
      const oldParams = { ...this.props.criteria, page: 1, pageSize: 4 };
      const params = { ...criteria, page: 1, pageSize: 4 };
      if (!_isEqual(params, oldParams)) {
        recommend(criteriaToApiParams(params));
      }
    }
    render() {
      const { publishes, classes, pending } = this.props;
      if (pending) {
        return null;
      }
      return (
        <div className={classes.recommends}>
          <h6>推荐</h6>
          <List type={type} entries={publishes} column={1} brief />
        </div>
      );
    }
  }

  return connect(
    (state) => {
      const { result, ...recommendState } = selectors.recommend(state);
      return { publishes: result || [], ...recommendState };
    },
    (dispatch) => bindActionCreators({ recommend: actions.recommend }, dispatch),
  )(injectSheet({
    recommends: {
      '& > h6': {
        margin: '0 0 16px',
      },
    },
  })(Recommends));
};
