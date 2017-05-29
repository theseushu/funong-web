// use a very simple solution to detect whether it's a mobile screen or not
export function isMobile() {
  return screen.width <= 640 || (window.matchMedia &&
      window.matchMedia('only screen and (max-width: 640px)').matches
    );
}
