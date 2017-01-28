const OPEN_DIALOG = 'map_dialog/open';
const CLOSE_DIALOG = 'map_dialog/close';

export default {
  mapDialog: (state = { open: false }, { type }) => {
    if (type === OPEN_DIALOG) {
      return { open: true };
    } else if (type === CLOSE_DIALOG) {
      return { open: false };
    }
    return state;
  },
};

export const actions = {
  openDialog: () => ({ type: OPEN_DIALOG, payload: {} }),
  closeDialog: () => ({ type: CLOSE_DIALOG }),
};

export const selector = (state) => state.mapDialog;
