import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';
import PageComponent from '../../page';

class Page extends Component { // eslint-disable-line
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    title: PropTypes.object,
    editPath: PropTypes.string.isRequired,
  }
  render() {
    const { content, title, editPath, sheet: { classes } } = this.props;
    return (
      <PageComponent smallContent={false}>
        <div className={classes.content}>
          { title }
          <div className={classes.entries}>
            <div className={classes.createButton}><Link to={`/${editPath}/new`}><FABButton accent><Icon name="add" /></FABButton></Link></div>
            { content }
          </div>
        </div>
      </PageComponent>
    );
  }
}
export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  entries: {
    width: '100%',
    marginTop: 24,
    position: 'relative',
    borderTop: `solid 1px ${colors.colorLightGrey}`,
  },
  createButton: {
    position: 'absolute',
    right: 16,
    top: -28,
  },
})(Page);
