import React, { useRef } from 'react';
import ProductCard from './components/ProductCard';
import Featured from './components/Featured';
import { getBrochureModels } from '../api';
import { Value } from '../api/types';
import Button from '../components/Button';
import * as store from '../api/store';
import { SettingsContext } from '../Settings';
import { RouteChildrenProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Dialog } from '@reach/dialog';
import * as theme from '../components/theme';

import '@reach/dialog/styles.css';

type IndexPageState = {
  brochureModels?: Value[];
};

interface IndexPageProps extends RouteChildrenProps {
  showHelp?: boolean;
}

const BM_SUB_TITLES = {
  BM_CHILD: 'From infancy to adolescence.',
  BM_INVISIBLE: 'Out of your way. On with your life.',
  BM_MAX: 'Maximum confidence. Minimum profile.',
  BM_POWER: 'Dynamically adjusts to any situation.'
};

function HelpOverlay({ brochureModels, history }) {
  const buttonEl = useRef(null);

  return (
    <Dialog
      isOpen={true}
      style={{
        borderRadius: theme.BORDER_RADIUS,
        boxShadow: theme.LIST_SHADOW
      }}
      initialFocusRef={buttonEl}
      onDismiss={() => history.replace('/home')}
    >
      <div className="text">
        {/*<div className="github-banner">
            <a href="https://github.com/configit-samples/clm">
              <img
                width="149"
                height="149"
                src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
                className="attachment-full size-full"
                alt="Fork me on GitHub"
                data-recalc-dims="1"
              />
            </a>
          </div>*/}
        <h1 className="title">iHear sample</h1>
        <div className="fill">
          <p>
            This is a sample configurator application based on the Configit CLM
            Platform. The sample application tries to mimic a website for a
            manufacturer of configurable hearing aids.
          </p>
          <p>
            Start by choosing one of the products on the home page:{' '}
            {(brochureModels || []).map(bm => (
              <Link
                key={bm.value}
                className="bm-link"
                to={`/products/${bm.value}`}
                replace
              >
                {bm.name}
              </Link>
            ))}
          </p>
          {/*<p>
              Browse the source code at{' '}
              <a
                href="https://github.com/configit-samples/clm"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://github.com/configit-samples//clm
              </a>
            </p>*/}
          <p>
            Read more about CLM at{' '}
            <a
              href="https://www.configit.com/clm"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://www.configit.com/clm
            </a>
          </p>
        </div>
        <div className="actions">
          <Button
            ref={buttonEl}
            color="dark"
            onClick={() => history.replace('/home')}
          >
            OK
          </Button>
        </div>
      </div>
      <style jsx>{`
        .title {
          font-size: 64px;
          margin-bottom: 16px;
        }
        .text {
          padding: 30px;
          border-radius: 6px;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }
        .fill {
          overflow: auto;
          flex: 1;
        }
        .github-banner {
          position: absolute;
          right: 0;
          top: 0;
        }

        /* Insert comma after each bm link */
        :global(.bm-link + .bm-link::before) {
          display: inline-block;
          white-space: pre;
          content: ', ';
        }
        :global([data-reach-dialog-content]) {
          width: 90vw;
        }
        .actions {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: flex-end;
        }
      `}</style>
    </Dialog>
  );
}

export default class IndexPage extends React.Component<
  IndexPageProps,
  IndexPageState
> {
  state = { brochureModels: null };

  static contextType = SettingsContext;

  async componentWillMount() {
    const brochureModels = await getBrochureModels(this.context.packagePath);
    this.setState(brochureModels);
  }

  componentDidMount() {
    store.reset();
  }

  render() {
    const { brochureModels } = this.state;
    const { history, showHelp } = this.props;
    return (
      <div>
        {showHelp ? (
          <HelpOverlay brochureModels={brochureModels} history={history} />
        ) : null}
        <Featured>
          <div style={{ textAlign: 'center' }}>
            <h2>
              <strong>iHear</strong> &nbsp;—&nbsp; revolutionary long battery
              life
            </h2>
            <Button color="dark" onClick={() => history.push('/read-more')}>
              Read More
            </Button>
          </div>
        </Featured>
        <h4>Build your own</h4>
        <div className="container">
          {(brochureModels || []).map(bm => (
            <ProductCard
              bg={`url(${process.env.PUBLIC_URL}/${bm.value}.jpg)`}
              title={bm.name}
              subTitle={BM_SUB_TITLES[bm.value]}
              key={bm.value}
              productId={bm.value}
            />
          ))}
        </div>

        <style jsx>{`
          h4 {
            font-weight: normal;
          }
          .container {
            display: flex;
            width: 100%;
          }
          @media screen and (max-width: 800px) {
            .container {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  }
}
