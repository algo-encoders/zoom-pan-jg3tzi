import './index.css';
import { renderer } from './renderer';

const container = document.getElementById('container');
const instance = renderer({
  scaleSensitivity: 50,
  minScale: 0.1,
  maxScale: 30,
  element: container.children[0],
});
let click_count = 0;
let clicked_hold = false;
let is_drag = false;
container.addEventListener('mousedown', (event) => {
  clicked_hold = true;
  is_drag = false;
});

container.addEventListener('mouseup', (event) => {
  clicked_hold = false;
});
container.addEventListener('click', (event) => {
  event.preventDefault();

  if (is_drag) {
    return;
  }

  if (click_count < 2) {
    instance.zoom({
      deltaScale: Math.sign(event.deltaY) > 0 ? -50 : 50,
      x: event.pageX,
      y: event.pageY,
    });

    click_count++;
  } else {
    instance.panTo({
      originX: 0,
      originY: 0,
      scale: 1,
    });

    click_count = 0;
  }
});

container.addEventListener('mousemove', (event) => {
  if (clicked_hold) {
    is_drag = true;
    event.preventDefault();
    instance.panBy({
      originX: event.movementX,
      originY: event.movementY,
    });
  }
});
