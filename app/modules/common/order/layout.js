import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMenu, CardActions } from 'react-mdl/lib/Card';
import IconButton from 'react-mdl/lib/IconButton';
import { statusValues } from 'appConstants';
import styles, { colors } from 'modules/common/styles';
import { isOwner as isOrderOwner } from 'utils/orderUtils';

class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    compact: PropTypes.bool,
    title: PropTypes.any.isRequired,
    titleCompact: PropTypes.any,
    content: PropTypes.any.isRequired,
    actions: PropTypes.any,
  }
  state = { compact: false }
  componentWillMount() {
    if (this.props.compact != null) {
      this.setState({ compact: this.props.compact });
    }
  }
  render() {
    const { classes, title, titleCompact, content, order, user, actions } = this.props;
    const { compact } = this.state;
    const status = _find(statusValues, (s) => s.value === order.status);
    let accent = false;
    let statusAccent = false;
    if (status && (
      status.value === statusValues.unconfirmed.value ||
      status.value === statusValues.billed.value ||
      status.value === statusValues.payed.value)) {
      statusAccent = true;
    }
    const isOwner = isOrderOwner(order, user);
    accent = !isOwner;
    return (
      <Card shadow={0} className={`${classes.card} ${styles.defaultTransition} ${accent ? classes.accent : null}`}>
        <CardMenu>
          <small className={statusAccent ? styles.colorAccent : null}>{status && status.title}</small>
          <IconButton name={compact ? 'expand_more' : 'expand_less'} onClick={() => this.setState({ compact: !this.state.compact })} />
        </CardMenu>
        <CardTitle className={classes.title}>
          { compact ? titleCompact : title }
        </CardTitle>
        { !compact && content }
        { !compact && actions && (
          <CardActions>{actions}</CardActions>
        )}
      </Card>
    );
  }
}

export default injectSheet({
  card: {
    width: '100%',
    minWidth: 0,
    minHeight: 0,
    marginBottom: 24,
  },
  accent: {
    borderTop: `solid 2px ${colors.colorAccent}`,
  },
  title: {
    paddingRight: 48,
  },
})(Layout);

