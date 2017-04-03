import React, { PropTypes, Component } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Header, Drawer, Content } from 'react-mdl/lib/Layout';
import IconButton from 'react-mdl/lib/IconButton';
import { breakpoints } from 'modules/common/styles';
import { actions, selectors } from './ducks';
import List from './components/list';
import Title from './components/title';
import Messages from './components/messages';
import Input from './components/input';

class Chat extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dialog: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
  }
  render() {
    const { dialog: { open, user }, closeDialog, classes } = this.props;
    return open ? (
      <div className={`${classes.chat} shadow--3 material-transition`}>
        <Layout fixedHeader fixedDrawer>
          <Header
            className={classes.header}
            title={<Title user={user} />}
          >
            <IconButton name="close" onClick={closeDialog} />
          </Header>
          <Drawer title={<span>联系人</span>}>
            <List />
          </Drawer>
          <Content className={classes.content}>
            <Messages />
            <Input />
          </Content>
        </Layout>
      </div>
    ) : null;
  }
}

const closeDialogAction = actions.closeDialog;
const dialogStateSelector = selectors.dialog;

export default injectSheet({
  chat: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    // above styles are used to center div in screen
    width: 850,
    height: 500,
    maxHeight: '100vh',
    backgroundColor: 'white',
    zIndex: 1000002,
    [breakpoints.mediaSmallScreen]: {
      width: '100vw',
      height: '100vh',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
})(connect(
  (state) => ({ dialog: dialogStateSelector(state) }),
  (dispatch) => bindActionCreators({ closeDialog: closeDialogAction }, dispatch),
)(Chat));
