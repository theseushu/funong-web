import jss from 'jss';

// see _material-design-lite.scss
export const colors = {
  colorPrimary: 'rgb(76,175,80)', // green500
  colorPrimaryDark: 'rgb(56,142,60)', // green700
  colorAccent: '#9C27B0', // purple500
  colorPrimaryContrast: 'black',
  colorAccentContrast: 'white',
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
  mediaTabletAbove: '@media (min-width: 481px)',
  mediaDestkopAbove: '@media (min-width: 841px)',
  mediaBigScreen: '@media (min-width: 1025px)',
  mediaTabletBelow: '@media (max-width: 480px)',
  mediaDestkopBelow: '@media (max-width: 840px)',
  mediaSmallScreen: '@media (max-width: 1024px)',
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

