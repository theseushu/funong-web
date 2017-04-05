import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { colors } from 'modules/common/styles';

class SubMenu extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    const { router } = context;
    const defaultOpen = _find(props.route.routes, (r) => router.isActive(r.path, true)) != null;
    this.state = { defaultOpen, open: defaultOpen };
  }
  toggle = (e) => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }
  render() {
    const { classes, route } = this.props;
    const { open, defaultOpen } = this.state;
    return (
      <div className={classes.itemWithSubMenu}>
        <Button onClick={this.toggle} className={defaultOpen ? 'active' : null} style={{ color: colors.colorSubTitle }}>{route.title}</Button>
        <div className={`${classes.subMenu} material-transition`} style={{ height: open ? 36 * route.routes.length : 0 }}>
          {
            route.routes.map((r, j) => (<Link key={j} to={r.path} onlyActiveOnIndex activeClassName={classes.active}><Button>{r.title}</Button></Link>))
          }
        </div>
      </div>
    );
  }
}


export default SubMenu;
