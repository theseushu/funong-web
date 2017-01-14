import { breakpoints } from '../../common/styles';

export const layout = {
  title: {
    col: 2,
    offsetDesktop: 2,
    tablet: 3,
    phone: 4,
  },
  content: {
    col: 6,
    offsetDesktop: 2,
    tablet: 5,
    phone: 4,
  },
  children: {
    col: 8,
    offsetDesktop: 2,
    tablet: 8,
    phone: 4,
  },
}

export default {
  grid: { width: '100%', boxSizing: 'border-box' },
  title: {
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [breakpoints.mediaTabletBelow]: {
      alignItems: 'center',
    },
  },
  textfield: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
  },
  input: {
    flex: 1,
    width: 150,
    marginLeft: 16,
  },
};
