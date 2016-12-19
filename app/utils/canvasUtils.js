export function scaleCanvas(canvas, width = canvas.width, height = canvas.height) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const retCanvas = document.createElement('canvas');
  const retCtx = retCanvas.getContext('2d');
  retCanvas.width = width;
  retCanvas.height = height;
  retCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight, 0, 0, width, height);
  return retCanvas;
}

export function getRoundedScaledCanvas(sourceCanvas, width, height) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const sWidth = sourceCanvas.width;
  const sHeight = sourceCanvas.height;
  context.imageSmoothingEnabled = true;

  canvas.width = width;
  canvas.height = height;

  context.drawImage(sourceCanvas, 0, 0, sWidth, sHeight, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}
