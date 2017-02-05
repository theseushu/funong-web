import jss from 'jss';

// see _material-design-lite.scss
export const colors = {
  colorPrimary: 'rgb(76,175,80)', // green500
  colorPrimaryDark: 'rgb(56,142,60)', // green700
  colorAccent: '#9C27B0', // purple500
  colorPrimaryContrast: 'black',
  colorAccentContrast: 'white',
  colorSubTitle: 'rgba(0,0,0, 0.54)',
  colorText: 'rgba(0,0,0, 0.87)',
  colorError: 'rgb(213,0,0)',
  colorLightGrey: 'rgba(0,0,0, 0.1)',
  colorPrice: '#FF5722', // deepOrange500
  colorCategoryLabel: '#827717', // lime900
  colorSpeciesLabel: '#558B2F', // lightGreen800
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
};

const { classes } = jss.createStyleSheet(styles).attach();

export default { ...classes, ...staticClasses };

