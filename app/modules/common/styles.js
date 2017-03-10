import jss from 'jss';

// see _material-design-lite.scss
export const colors = {
  colorPrimary: 'rgb(76,175,80)', // green500
  colorPrimaryDark: 'rgb(56,142,60)', // green700
  colorAccent: '#9C27B0', // purple500
  colorLightAccent: '#F3E5F5', // purple50 use as background or similiar stuff
  colorPrimaryContrast: 'black',
  colorAccentContrast: 'white',
  colorSubTitle: 'rgba(0,0,0, 0.54)',
  colorText: 'rgba(0,0,0, 0.87)',
  colorError: 'rgb(213,0,0)',
  colorLightGrey: 'rgba(0,0,0, 0.1)',
  colorPrice: '#FF5722', // deepOrange500
  colorCategoryLabel: '#827717', // lime900
  colorSpeciesLabel: '#558B2F', // lightGreen800
  colorUnverified: '#AFB42B', // lime700
  colorVerified: '#33691E', // lightGreen900
  colorRejected: '#EF6C00', // orange800
  colorWarning: '#FBC02D', // yellow700
  colorIDVerified: '#4DB6AC', // teal300
  colorCompanyVerified: '#DCE775', // lime300
  colorExpertVerified: '#7986CB', // indigo300
  colorMenuBg: '#E8F5E9', // green50
};

export const breakpoints = {
  tablet: 480,
  desktop: 840,
  bigScreen: 1024,
  mediaTabletAbove: '@media (min-width: 480px)',
  mediaDestkopAbove: '@media (min-width: 840px)',
  mediaBigScreen: '@media (min-width: 1024px)',
  mediaTabletBelow: '@media (max-width: 479px)',
  mediaDestkopBelow: '@media (max-width: 839px)',
  mediaSmallScreen: '@media (max-width: 1023px)',
};

export const layouts = {
  gutter: 16,
  gutterSmall: 8,
};

const staticClasses = {
  typography: {
    h1: 'mdl-typography--display-4',
  },
};

export const shadows = {
  shadow2: 'mdl-shadow--2dp',
  shadow3: 'mdl-shadow--3dp',
  shadow4: 'mdl-shadow--4dp',
  shadow5: 'mdl-shadow--5dp',
  shadow6: 'mdl-shadow--6dp',
  shadow7: 'mdl-shadow--7dp',
  shadow8: 'mdl-shadow--8dp',
};

const styles = {
  contentCenter: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  container: {
    width: '100%',
    'max-width': '1200px',
    padding: '0 8px',
    margin: '0 auto',
    'box-sizing': 'border-box',
  },
  [breakpoints.mediaTabletAbove]: {
    container: {
      padding: '0 16px',
    },
  },
  [breakpoints.mediaBigScreen]: {
    container: {
      padding: '0 24px',
    },
  },
  containerSmall: {
    'max-width': '900px',
  },
  colorError: {
    color: colors.colorError,
  },
  colorAccent: {
    color: colors.colorAccent,
  },
  colorSubTitle: {
    color: colors.colorSubTitle,
  },
  colorUnverified: {
    color: colors.colorUnverified,
  },
  colorRejected: {
    color: colors.colorRejected,
  },
  colorVerified: {
    color: colors.colorVerified,
  },
  colorWarning: {
    color: colors.colorWarning,
  },
  colorPrice: {
    color: colors.colorPrice,
  },
  defaultTransition: {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms !important',
  },
  textNowrap: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
  },
  w100: {
    width: '100%',
  },
  mw100: {
    'max-width': '100%',
  },
  mt16: {
    'margin-top': '16px',
  },
  mt24: {
    'margin-top': '24px',
  },
  mt0: {
    'margin-top': '0px',
  },
};

const { classes } = jss.createStyleSheet(styles).attach();

export default { ...classes, ...staticClasses };

