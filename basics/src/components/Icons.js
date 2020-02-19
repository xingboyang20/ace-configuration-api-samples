import React from 'react';

export function Reset({ width = '20px', height = '20px' }) {
  return (
    <svg viewBox="0 0 24 24" height={height} width={width}>
      <g transform="matrix(1,0,0,1,0,0)">
        <path
          d="M22.664,5.578c0.586-0.586,0.586-1.535,0-2.121l-2.121-2.121c-0.586-0.586-1.535-0.586-2.121-0.001c0,0,0,0-0.001,0.001 l-6.244,6.245c-0.098,0.097-0.256,0.097-0.354,0L5.579,1.336C4.993,0.75,4.044,0.75,3.458,1.335c0,0,0,0-0.001,0.001L1.336,3.457 c-0.586,0.586-0.586,1.535,0,2.121l6.245,6.245c0.097,0.098,0.097,0.256,0,0.354l-6.245,6.245c-0.586,0.586-0.586,1.535,0,2.121 l2.121,2.121c0.586,0.586,1.535,0.586,2.121,0.001c0,0,0,0,0.001-0.001l6.244-6.245c0.098-0.097,0.256-0.097,0.354,0l6.244,6.245 c0.586,0.586,1.535,0.586,2.121,0.001c0,0,0,0,0.001-0.001l2.121-2.121c0.586-0.586,0.586-1.535,0-2.121l-6.245-6.245 c-0.097-0.098-0.097-0.256,0-0.354L22.664,5.578z"
          stroke="none"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function Clear({ width = '24px', height = '24px' }) {
  return (
    <svg
      width={width}
      height={height}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <g transform="matrix(1,0,0,1,0,0)">
        <path
          d="M 4.5,19.5l15-15"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 4.5,4.5l15,15"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
