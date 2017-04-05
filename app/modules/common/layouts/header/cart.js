import React, { Component, PropTypes } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _once from 'lodash/once';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Icon from 'react-mdl/lib/Icon';
import Badge from 'react-mdl/lib/Badge';
import { currentUserSelector, cartItemsSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';
import { actions, selectors } from 'api/cart';

class Cart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchState: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    cartLength: PropTypes.number.isRequired,
    user: PropTypes.object,
  }
  componentDidMount() {
    this.fetch(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.fetch(newProps);
  }
  fetch = (props) => {
    const { fetchState, user } = props;
    if (user && _isEmpty(fetchState)) {
      this.fetchCartItems();
    }
  }
  fetchCartItems = _once(() => this.props.fetch())
  render() {
    const { user, fetchState, cartLength, classes } = this.props;
    if (!user) {
      return null;
    }
    const { fulfilled } = fetchState;
    if (fulfilled && cartLength > 0) {
      return (
        <Link to="/me/cart" className={classes.cart}>
          <Badge text={cartLength} overlap>
            <Icon name="shopping_cart" />
          </Badge>
        </Link>
      );
    }
    return (
      <Link to="/me/cart" className={classes.cart}>
        <Icon name="shopping_cart" />
      </Link>
    );
  }
}

const fetchCartAction = actions.fetch;
const fetchCartStateSelector = selectors.fetch;
export default injectSheet({
  cart: {
    minWidth: 32,
    height: 32,
    color: colors.colorSubTitle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(connect(
  (state) => ({ user: currentUserSelector(state), fetchState: fetchCartStateSelector(state), cartLength: cartItemsSelector(state).length }),
  (dispatch) => bindActionCreators({ fetch: fetchCartAction }, dispatch),
)(Cart));
