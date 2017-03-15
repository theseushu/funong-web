import { breakpoints } from 'modules/common/styles';
export const floatingMenuClass = '_floatingMenu';

export default {
  container: {
    width: '100%',
    'max-width': '1200px',
    padding: '0 8px',
    margin: '0 auto',
    'box-sizing': 'border-box',
    [`& .${floatingMenuClass}`]: {
      position: 'fixed',
      bottom: '40px',
      zIndex: 908,
    },
    [breakpoints.mediaTabletAbove]: {
      padding: '0 16px',
    },
    [breakpoints.mediaBigScreen]: {
      padding: '0 24px',
    },
    '@media (max-width: 1200px)': {
      [`& .${floatingMenuClass}`]: {
        right: '40px',
      },
    },
    '@media (min-width: 1200px)': {
      [`& .${floatingMenuClass}`]: {
        right: 'calc(50vw - 640px)',
      },
    },
  },
  containerSmall: {
    'max-width': '900px',
    '@media (max-width: 900px)': {
      [`& .${floatingMenuClass}`]: {
        right: '40px',
      },
    },
    '@media (min-width: 900px)': {
      [`& .${floatingMenuClass}`]: {
        right: 'calc(50vw - 490px)',
      },
    },
  },
  layout: {
    zIndex: 10001,
    [breakpoints.mediaDestkopAbove]: {
      '& .mdl-layout__drawer-button': {
        display: 'none',
      },
    },
  },
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
};
