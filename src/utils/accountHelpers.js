export const getSpecs = () => {
  const dualScreenL = window.screenLeft ? window.screenLeft : window.screenX;
  const dualScreenT = window.screenTop ? window.screenTop : window.screenY;

  let displayWidth, displayHeight;

  if (window.innerWidth) {
    displayWidth = window.innerWidth;
  } else if (document.documentElement.clientWidth) {
    displayWidth = document.documentElement.clientWidth;
  } else {
    displayWidth = screen.width;
  }

  if (window.innerHeight) {
    displayHeight = window.innerHeight;
  } else if (document.documentElement.clientHeight) {
    displayHeight = document.documentElement.clientHeight;
  } else {
    displayHeight = screen.height;
  }

  const width = 500 < displayWidth ? 500 : displayWidth;
  const height = 500 < displayHeight ? 500 : displayHeight;

  const left = ((displayWidth / 2) - (width / 2)) + dualScreenL;
  const top = ((displayHeight / 2) - (height / 2)) + dualScreenT;

  return `width=${width}, height=${height}, top=${top}, left=${left}`;
};
