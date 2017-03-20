import { colors } from 'modules/common/styles';

export const layouts = {
  priceColumnWidth: 150,
  right: 450,
};

export default {
  card: {
    width: '100%',
    minWidth: 0,
    minHeight: 0,
    marginBottom: 24,
  },
  thumbnail: {
    width: 40,
    height: 40,
  },
  content: {
    padding: '0 24px',
  },
  items: {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  line: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    '& > ._left': {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& > ._right': {
      width: 420,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& small': {
      color: colors.colorSubTitle,
    },
  },
  item: {
    marginBottom: 16,
    '& ._thumbnail': {
      marginRight: 16,
      width: 80,
      height: 80,
      '& i': {
        fontSize: 80,
      },
    },
    '& ._nameAndSpec': {
      flex: 1,
      color: colors.colorSubTitle,
    },
    '& ._price': {
      color: colors.colorSubPrice,
      width: 140,
    },
    '& ._quantity': {
      width: 140,
    },
    '& ._amount': {
      color: colors.colorSubPrice,
      width: 140,
    },
  },
  services: {
    color: colors.colorSubTitle,
    '& ._info': {
      flex: 1,
      paddingRight: 16,
    },
    '& ._amount': {
      color: colors.colorSubPrice,
      width: 140,
    },
  },
  messages: {
  },
  message: {
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    marginRight: 24,
  },
  amount: {
    paddingTop: 24,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    color: colors.colorPrice,
    '& > div': {
      width: 180,
    },
  },
};

