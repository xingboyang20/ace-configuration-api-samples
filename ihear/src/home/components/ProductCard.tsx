import React from 'react';
import * as theme from '../../components/theme';
import { Link } from 'react-router-dom';

function ProductCard({ bg, productId, title, subTitle }) {
  return (
    <div className="card">
      <Link to={`/products/${productId}`} className="card-link">
        <div className="content">
          {subTitle && <div className="subTitle">{subTitle}</div>}
        </div>
        <div className="titles">
          {title && <div className="title">{title}</div>}
        </div>
      </Link>

      <style jsx>{`
        .card > :global(.card-link) {
          margin: 0 10px;
          border-radius: 2px;
        }
        .card:first-child > :global(.card-link) {
          margin-left: 0;
        }
        .card:last-child > :global(.card-link) {
          margin-right: 0;
        }
        .card > :global(.card-link) {
          height: 300px;
          display: flex;
          flex-direction: column;
        }
        .card {
          flex: 1;
        }
        .content {
          position: relative;
          background: ${bg};
          background-size: cover;
          background-position: 40%;
          flex: 1;
        }
        .titles {
          font-size: 16px;
        }
        .title {
          margin-top: 8px;
          white-space: nowrap;
        }
        .content:hover .subTitle {
          opacity: 1;
        }
        .subTitle {
          opacity: 0;
          transition: opacity ${theme.DEFAULT_TRANSITION_DURATION};
          font-size: 12px;
          margin-top: 8px;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          position: absolute;
          color: #313131;
          background-color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 6px;
        }
        a {
          text-decoration: none !important;
        }

        @media screen and (max-width: 800px) {
          .card > :global(.card-link) {
            margin: 16px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
