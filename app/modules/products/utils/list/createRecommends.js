import React, { Component, PropTypes } from 'react';
import _isEqual from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { criteriaToApiParams } from 'modules/common/criteria/utils';

export default (actions, selectors, BriefCard) => {
  class Recommends extends Component {
    static propTypes = {
      pending: PropTypes.bool,
      criteria: PropTypes.object.isRequired,
      products: PropTypes.array.isRequired,
      classes: PropTypes.object.isRequired,
      recommendProducts: PropTypes.func.isRequired,
    }
    componentDidMount() {
      const { recommendProducts, criteria } = this.props;
      recommendProducts(criteriaToApiParams({ ...criteria, page: 1, pageSize: 4 }));
    }
    componentWillReceiveProps(newProps) {
      const { recommendProducts, criteria } = newProps;
      const oldParams = { ...this.props.criteria, page: 1, pageSize: 4 };
      const params = { ...criteria, page: 1, pageSize: 4 };
      if (!_isEqual(params, oldParams)) {
        recommendProducts(criteriaToApiParams(params));
      }
    }
    render() {
      const { products, classes, pending } = this.props;
      if (pending) {
        return null;
      }
      return (
        <div className={classes.recommends}>
          <h6>推荐</h6>
          {
              products.filter((product, i) => i < 4).map((product, i) => (
                <div key={i} className={classes.product}>
                  <BriefCard key={i} product={product} />
                </div>
              ))
            }
        </div>
      );
    }
  }

  return connect(
    (state) => {
      const { result, ...recommendState } = selectors.recommendProducts(state);
      return { products: result || [], ...recommendState };
    },
    (dispatch) => bindActionCreators({ recommendProducts: actions.recommendProducts }, dispatch),
  )(injectSheet({
    recommends: {
      '& > h6': {
        margin: '0 0 16px',
      },
    },
    product: {
      marginBottom: 16,
    },
  })(Recommends));
};
