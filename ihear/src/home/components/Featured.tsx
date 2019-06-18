import React from 'react';
import * as theme from '../../components/theme';

const Featured: React.SFC<{ title?: string }> = ({ title, children }) => (
  <div className="featured">
    {title && <h3 className="title">{title}</h3>}
    {children}
    <style jsx>{`
      .featured {
        width: 100%;
        height: 400px;
        margin: 20px 0 50px 0;
        padding-top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url(${process.env.PUBLIC_URL}/featured.jpg);
        background-size: cover;
        background-position-y: 80%;
        border-radius: 2px;
        box-shadow: ${theme.LIST_SHADOW};
        color: #111;
      }
      .title {
        text-transform: uppercase;
        white-space: normal;
      }
      a {
        text-decoration: none !important;
      }
    `}</style>
  </div>
);

export default Featured;
