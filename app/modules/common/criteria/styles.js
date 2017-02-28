import { colors } from 'modules/common/styles';

export default {
  line: {
    display: 'flex',
    margin: 16,
    '& a': {
      textDecoration: 'none',
    },
  },
  title: {
    color: colors.colorSubTitle,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > a': {
      marginLeft: 16,
      marginBottom: 4,
    },
  },
};
