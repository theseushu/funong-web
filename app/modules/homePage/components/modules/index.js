import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Icon from 'react-mdl/lib/Icon';
import injectSheet from 'react-jss';
import { publishTypes, publishTypesInfo } from 'funong-common/lib/appConstants';
import styles, { breakpoints, colors } from 'modules/common/styles';

const modules = [
  {
    icon: publishTypesInfo[publishTypes.supply].icon,
    title: '农资农产',
    subtitle: '实时发布 平台推广 在线联系 担保交易',
    backgroundColor: '#D4E157',  // lime400
    link: `/${publishTypesInfo[publishTypes.supply].plural}`,
  },
  {
    icon: publishTypesInfo[publishTypes.inquiry].icon,
    title: '农产采购',
    subtitle: '全国货源 进货首选 在线联系 担保交易',
    backgroundColor: '#FFCC80', // orange200
    link: `/${publishTypesInfo[publishTypes.inquiry].plural}`,
  },
  {
    icon: publishTypesInfo[publishTypes.trip].icon,
    title: '乡村游',
    subtitle: '乡村生活体验。都市假日休闲首选',
    backgroundColor: '#AED581', // lightGreen300
    link: `/${publishTypesInfo[publishTypes.trip].plural}`,
  },
  {
    icon: publishTypesInfo[publishTypes.product].icon,
    title: '社区微商',
    subtitle: '看看您周边的社区超市吧',
    backgroundColor: '#81D4FA', // lightBlue200
    link: `/${publishTypesInfo[publishTypes.product].plural}`,
  },
];

const Module = ({ classes, title, subtitle, icon, backgroundColor, link }) => (
  <Link className={`${classes.module} shadow--1 material-transition`} style={{ borderTop: `solid 1px ${backgroundColor}` }} to={link}>
    <div className={`_icon ${styles.contentCenter}`} style={{ backgroundColor }}>
      <Icon name={icon} />
    </div>
    <div className="_title">
      <h6>
        {title}
      </h6>
      <p>
        {subtitle}
      </p>
    </div>
  </Link>
);

Module.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Modules = ({ classes }) => (
  <div className={classes.modules}>
    {
      modules.map((module, i) => <Module key={i} {...module} classes={classes} />)
    }
  </div>
);

Modules.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  modules: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  module: {
    background: 'rgba(0, 0, 0, 0.05)',
    display: 'flex',
    padding: '36px 16px',
    maxWidth: 'calc(25% - 24px)',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px !important',
    },
    '& > ._icon': {
      width: 80,
      height: 80,
      borderRadius: '50%',
      color: 'white',
      '& > i': {
        fontSize: 40,
      },
    },
    '& > ._title': {
      textAlign: 'left',
      margin: '4px 0 4px 16px',
      flex: 1,
      '& > h6': {
        margin: 0,
        color: colors.colorText,
      },
      '& > p': {
        margin: 0,
        color: colors.colorSubTitle,
      },
    },
    [breakpoints.mediaSmallScreen]: {
      padding: '16px 16px',
      background: 'none',
      flexDirection: 'column',
      maxWidth: '25%',
      alignItems: 'center',
      '& > ._title': {
        textAlign: 'center',
        width: '100%',
        margin: '16px 0',
        flex: 1,
        '& > h6': {
          margin: 0,
          color: colors.colorText,
        },
        '& > p': {
          display: 'none',
        },
      },
    },
    [breakpoints.mediaTabletBelow]: {
      '& > ._title': {
        '& > h6': {
          fontSize: 14,
        },
      },
    },
  },
})(Modules);
