import { ReactComponent as Circle } from '../../components/Icons/Circle.svg';

const icons = {
  COLOR_BEIGE: { Component: Circle, props: { fill: 'hsl(34, 22%, 75%)' } },
  COLOR_BLACK: { Component: Circle, props: { fill: 'hsl(0, 5%, 5%)' } },
  COLOR_BLUE: { Component: Circle, props: { fill: 'hsl(218, 96%, 10%)' } },
  COLOR_BROWN: { Component: Circle, props: { fill: 'hsl(21, 27%, 31%)' } },
  COLOR_PINK: { Component: Circle, props: { fill: 'hsl(327, 73%, 78%)' } },
  COLOR_WHITE: { Component: Circle, props: { fill: 'hsl(1, 100%, 100%)' } },
  COLOR_TRANSPARENT: {
    Component: Circle,
    props: { stroke: 'hsl(218, 96%, 10%)', fill: 'transparent' }
  }
};

export default icons;
