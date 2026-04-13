import { shapes } from './shapes';

export const nextRotation = (
  shape: number,
  rotation: number,
  reverse: boolean,
) => {
  let newRotation = (rotation + (reverse ? -1 : 1)) % shapes[shape].length;
  return newRotation >= 0 ? newRotation : shapes[shape].length - 1;
};
