const OPEN_GALLERY = 'full_screen_gallery/open';
const CLOSE_GALLERY = 'full_screen_gallery/close';

export default {
  fullScreenGallery: (state = { open: false }, { type, payload }) => {
    if (type === OPEN_GALLERY) {
      return { open: true, images: payload.images, index: payload.index || 0 };
    } else if (type === CLOSE_GALLERY) {
      return { open: false };
    }
    return state;
  },
};

export const actions = {
  openGallery: (images, index = 0) => ({ type: OPEN_GALLERY, payload: { images, index } }),
  closeGallery: () => ({ type: CLOSE_GALLERY }),
};

export const selector = (state) => state.fullScreenGallery;
