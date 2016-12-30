import React, { Component, PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Image from 'react-bootstrap/lib/Image';
import IndexLink from 'react-router/lib/Link';
import Waypoint from 'react-waypoint';
import injectSheet from 'react-jss';


const backgroundImg = require('./assets/appbar-bg.jpg');

const styles = {
  background: {
    height: '200px',
    position: 'relative',
    background: `url(${backgroundImg})`,
    '&:before': {
      height: '100%',
    },
    '@media (min-width: 768px)': {
      height: '250px',
    },
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  },
  wrapper: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  waypoint: {
    position: 'absolute',
    width: '100%',
    top: '50px',
    height: 1,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>.navbar-form': {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 0,
      border: 'none',
      boxShadow: 'none',
      '&>.form-group': {
        width: '100%',
        display: 'inline-block',
      },
    },
  },
  avatar: {
    '&>a': {
      width: 64,
      height: 64,
      padding: '14px !important',
      '&>img': {
        maxWidth: '100% !important',
      },
    },
  },
};


class AppBarComponent extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    sheet: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { raising: false, drawer: false };
  }

  toggleRaising = (raising) => {
    this.setState({ raising });
  };

  render() {
    const { sheet: { classes }, currentUser } = this.props;
    const { raising } = this.state;

    return ( // there's transition: all .... defined in AppBar. so there's no need to add specific animation anymore
      <div className={classes.background}>
        <div className={classes.overlay} />
        <div className={classes.waypoint}>
          <Waypoint
            onEnter={() => this.toggleRaising(false)}
            onLeave={() => this.toggleRaising(true)}
          />
        </div>
        <div className={`${classes.wrapper} material-transition`} style={{ marginTop: raising ? 0 : 30 }}>
          <Navbar inverse collapseOnSelect style={raising ? {} : { background: 'none', border: 'none', boxShadow: 'none' }}>
            <Navbar.Header>
              <div className={classes.headerWrapper}>
                <Navbar.Brand bsStyle="custom">
                  <a>$</a>
                </Navbar.Brand>
                <Navbar.Form>
                  <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                  </FormGroup>
                </Navbar.Form>
                <Navbar.Toggle />
              </div>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
              </Nav>
              <ul className="nav navbar-nav navbar-right">
                <li role="presentation">
                  <a role="button" href="">Link Right</a>
                </li>
                {
                  currentUser && currentUser.avatar && (
                    <li role="presentation" className={classes.avatar}>
                      <IndexLink to="/profile" activeStyle={{ pointerEvents: 'none' }}><Image circle responsive src={currentUser.avatar.url} /></IndexLink>
                    </li>
                  )
                }
              </ul>
            </Navbar.Collapse>
            <Nav>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
}


export default injectSheet(styles)(AppBarComponent);
