import { breakpoints, colors } from 'modules/common/styles';
export default {
  card: {
    width: '100%',
    marginBottom: 48,
    padding: 24,
    '& .mdl-card__title-text': {
      color: colors.colorSubTitle,
    },
    '& > .mdl-card__supporting-text': {
      width: '100%',
      maxWidth: 520,
    },
    '& > button': {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    [breakpoints.mediaDestkopBelow]: {
      padding: 16,
      marginBottom: 24,
    },
    [breakpoints.mediaTabletBelow]: {
      padding: 0,
    },
  },
};
