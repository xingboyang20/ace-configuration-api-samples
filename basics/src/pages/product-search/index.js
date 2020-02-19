import React from 'react';
import Page from '../../components/Page';
import products from '../../api/products';
import './index.css';

/**
 * Component with an input field and a button.
 *
 * Calls the `onSearch` prop when the button is clicked
 */
const SearchInput = ({ isSearching, onSearch }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSearch(e.target.elements.searchInput.value);
    }}
    autoComplete="off"
    className="product-search-input"
  >
    <input
      type="text"
      name="searchInput"
      placeholder="Search for products"
      disabled={isSearching}
    />
    <button type="submit" disabled={isSearching}>
      <span>⚲</span>
    </button>
  </form>
);

/**
 * Display details (properties) of a product
 */
const ProductDetails = ({ product }) => (
  <div className="product-details">
    {product.properties.map(property => (
      <React.Fragment key={property.id}>
        <div>{property.id}</div>
        <div>{property.value}</div>
      </React.Fragment>
    ))}
  </div>
);

/**
 * Display the product summary:
 *
 * * name
 * * description
 * * configurable or standard
 *
 * and a link to toggle the details
 */
function ProductSummary({ product, showDetails, onToggleDetails }) {
  return (
    <div className="product-summary">
      <div>
        <div>
          {product.id} &mdash; {product.name}
        </div>
        <div>
          <em>{product.description}</em>
        </div>
      </div>
      <div>
        <div>
          <em>
            {product.isConfigurable ? (
              <a href={`/configurator/${product.id}`}>Configure</a>
            ) : (
              'Standard'
            )}
          </em>
          {', '}
          <em>
            <a href={`/pricing/${product.id}`}>Price</a>
          </em>
        </div>
        <div>
          {product.properties.length ? (
            <button
              onClick={onToggleDetails}
              className="product-summary-toggle-details"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
/**
 * Display a single product in the `ProductList`
 *
 * Manages the state for show/hide of product details
 */
class ProductListItem extends React.Component {
  state = { showDetails: false };

  /**
   * Called when "Show/Hide details" link is clicked
   */
  handleToggleDetails = e => {
    e.preventDefault();
    const { showDetails } = this.state;
    this.setState({ showDetails: !showDetails });
  };

  render() {
    const { product } = this.props;
    const { showDetails } = this.state;

    return (
      <div className="products-list-item">
        <ProductSummary
          showDetails={showDetails}
          onToggleDetails={this.handleToggleDetails}
          product={product}
        />
        {showDetails ? <ProductDetails product={product} /> : null}
      </div>
    );
  }
}

/**
 * Displays a list of products found by the product service
 */
const ProductList = ({ products }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="products-list">
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

/**
 * Example of how to use the product search api to find
 * products in a package.
 */
class ProductSearch extends React.Component {
  state = { isSearching: false, products: [] };

  /**
   * Called when the search button is clicked
   *
   * * call the product service with entered search term
   * * update the state with the result
   */
  handleSearch = async searchTerm => {
    this.setState({ isSearching: true });
    const result = await products({
      // Package path is read from environment (.env)
      packagePath: process.env.REACT_APP_PACKAGE_PATH,
      searchTerm
    });
    this.setState({ isSearching: false, products: result.products });
  };

  render() {
    const { isSearching, products } = this.state;

    return (
      <Page>
        <div className="product-search">
          <SearchInput isSearching={isSearching} onSearch={this.handleSearch} />
          {isSearching ? 'Searching...' : <ProductList products={products} />}
        </div>
      </Page>
    );
  }
}

export default ProductSearch;
