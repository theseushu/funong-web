import jss from 'jss';

// see _material-design-lite.scss
export const colors = {
  colorPrimary: 'rgb(76,175,80)', // green500
  colorPrimaryDark: 'rgb(56,142,60)', // green700
  colorAccent: '#9C27B0', // purple500
  colorPrimaryContrast: 'black',
  colorAccentContrast: 'white',
  colorText: 'rgba(0,0,0, 0.87)',
  colorSubTitle: 'rgba(0,0,0, 0.6)',
};

export const layouts = {
  gutter: 16,
  gutterSmall: 8,
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
    padding: '0 16px',
    margin: '0 auto',
    'box-sizing': 'border-box',
  },
  '@media (min-width: 1025px)': {
    container: {
      padding: '0 24px',
      'max-width': '1200px',
    },
  },
};

const { classes } = jss.createStyleSheet(styles).attach();

export default { ...classes, ...staticClasses };

