import React from 'react';
import Page from '../../components/Page';
import priceAPI from '../../api/price';
import PriceSheet from './components/PriceSheet';
import { globalArguments } from '../../globalArguments';
import './index.css';
import PriceHeader from './components/PriceHeader';

/**
 * Component shown if product Id and/or configuration id is missing from URL.
 */
function NoIdPage({ productId }) {
  return (
    <Page>
      <div className="no-id-page">
        <h2>{!productId} Product id is missing</h2>
        <p>
          To start the specify a product id in the URL, for example{' '}
          <a href="/pricing/CBEER">/pricing/CBEER</a>
        </p>
        <p>
          If you don't know any product id, use the{' '}
          <a href="/product-search">product search</a> to find one.
        </p>
      </div>
    </Page>
  );
}

/**
 * Example of how to use the `/price` endpoint to create a pricereport.
 *
 * The `<Pricing>` component is the top level component. It manages state and
 * pushes state changes from the `/price` endpoint down to sub component that
 * renders the pricereport.
 *
 * The pricing screen has the following structure.
 *
 * +--------------------------------------------------------------------------+
 * | Pricing                                                                  |
 * | +----------------------------------------------------------------------+ |
 * | | PriceHeader                                                          | |
 * | +----------------------------------------------------------------------+ |
 * | +----------------------------------------------------------------------+ |
 * | | PriceSheet                                                           | |
 * | | +------------------------------------------------------------------+ | |
 * | | | PriceLine+                                                       | | |
 * | | +------------------------------------------------------------------+ | |
 * | +----------------------------------------------------------------------+ |
 * +--------------------------------------------------------------------------+
 */
class Pricing extends React.Component {
  assignments = [];
  quantity = { value: 1, unit: 'EA' };

  state = {
    activeTabIndex: 0
  };

  componentDidMount() {
    this.price(this.quantity);
  }

  handleActiveTabChange = activeTabIndex => this.setState({ activeTabIndex });

  /**
   * Called when the price reports needs to be recalculated.
   *
   *  * When this component is mounted (to get initial configuration)
   *  * When users assign/unassign values to pricelines
   */
  price = async (quantity, assignments = {}) => {
    const { productId } = this.props.match.params;
    if (!productId) {
      return;
    }
    const packagePath = process.env.REACT_APP_PACKAGE_PATH;

    try {
      const result = await priceAPI({
        packagePath,
        date: new Date(),
        language: 'EN',
        globalArguments,
        line: {
          quantity,
          productId,
          priceLineAssignments: Object.keys(assignments).map(k => ({
            stepId: k,
            rateValue: assignments[k]
          }))
        }
      });
      if (result.priceSheet) {
        this.setState({
          priceSheet: result.priceSheet
        });
      } else {
        this.setState({
          error:
            `Product with id '${productId}' doesn't have any prices defined ` +
            `in package with path '${packagePath}'`
        });
      }
    } catch (e) {
      if (e.type === 'CannotLoadPackage') {
        this.setState({
          error:
            `Product with id '${productId}' doesn't exist ` +
            `in package with path '${packagePath}'`
        });
      } else {
        throw e;
      }
    }
  };

  /**
   * Called when users make an assignment.
   */
  handleOnAssign = (stepId, rateValue) => {
    this.assignments[stepId] = rateValue;
    this.price(this.quantity, this.assignments);
  };

  /**
   * Called when users change the quantity in the `<LineSummary>` component.
   */
  handleQuantityChange = quantity => {
    this.quantity = quantity;
    this.price(quantity, this.assignments);
  };

  render() {
    const { productId } = this.props.match.params;

    const { error, priceSheet } = this.state;

    if (!productId) {
      return <NoIdPage productId={productId} />;
    }
    if (error) {
      return <Page>{error}</Page>;
    }
    if (!priceSheet) {
      return <Page>Loading…</Page>;
    }

    return (
      <Page variant="transparent">
        <PriceHeader
          quantity={this.quantity}
          onQuantityChange={this.handleQuantityChange}
          productId={productId}
          totalPrice={priceSheet.totals.total}
        />
        <PriceSheet priceSheet={priceSheet} onAssign={this.handleOnAssign} />
      </Page>
    );
  }
}

export default Pricing;
