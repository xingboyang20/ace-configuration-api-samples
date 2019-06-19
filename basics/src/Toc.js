import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import './Toc.css';

const Examples = ({ children }) => (
  <nav className="toc-examples">{children}</nav>
);

const Example = ({ href, title, children }) => (
  <Link to={href} className="toc-example">
    <div className="toc-example-link">{title}</div>
    <div className="toc-example-description">{children}</div>
  </Link>
);

/**
 * Table of Contents, displays a list of examples.
 */
const Toc = () => (
  <div className="toc">
    <h1 className="toc-title">
      <Logo height="42px" /> — CLM Platform samples
    </h1>
    <p className="toc-lead">
      Examples that illustrate how to build web applications with the CLM
      Platform APIs.
    </p>
    <Examples>
      <Example href="/product-search" title="Product Search">
        Use the <code>/products</code> API to find products in a package
      </Example>

      <Example href="/configurator" title="Configurator">
        Use the <code>/configure</code> API to create an interactive
        configurator
      </Example>
    </Examples>
  </div>
);

export default Toc;
