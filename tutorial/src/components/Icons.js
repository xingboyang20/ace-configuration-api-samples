import React from 'react';

export const Error = ({ width = '24px', height = '24px' }) => (
  <svg
    width={width}
    height={height}
    x="0px"
    y="0px"
    fill="currentColor"
    stroke="none"
    enableBackground="new 0 0 24 24"
    version="1.1"
    viewBox="0 0 24 24"
  >
    <g>
      <path
        d="M12,0C5.383,0,0,5.382,0,12c0,6.616,5.383,12,12,12s12-5.384,12-12C24,5.382,18.617,0,12,0z M12.321,20.487
		c-2.129,0-3.547-0.702-5.089-1.753L18.735,7.231c0.68,1,1.752,2.535,1.752,5.089C20.487,16.823,16.824,20.487,12.321,20.487z
		 M11.667,3.5c2.124,0,3.545,0.699,5.089,1.752L5.252,16.755c-0.682-1-1.752-2.536-1.752-5.089C3.5,7.163,7.164,3.5,11.667,3.5z"
      />
    </g>
  </svg>
);

export const Clear = ({ width = '24px', height = '24px' }) => (
  <svg width={width} height={height} stroke="currentColor" viewBox="0 0 24 24">
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    >
      <circle cx="12.016" cy="12" r="11.5" />
      <path d="M3.884 3.869l16.263 16.263M20.147 3.869l-16.263 16.262" />
    </g>
  </svg>
);
