import tinycolor from 'tinycolor2';

export const tint = (color: string, amount: number) =>
  tinycolor.mix(color, 'white', amount);

export const alpha = (color: string, amount: number) =>
  tinycolor(color).setAlpha(amount);

export const darken = (color: string, amount: number) =>
  tinycolor(color).darken(amount);
