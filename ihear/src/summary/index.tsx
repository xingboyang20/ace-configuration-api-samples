import React, { ReactNode, useState, useEffect, useContext } from 'react';
import * as store from '../api/store';
import Selections from '../components/Selections';
import { Value, Section } from '../api/types';
import { getConfiguration } from '../api';
import Button from '../components/Button';
import Image from '../components/Image';
import FormField from '../components/FormField';
import * as theme from '../components/theme';
import md5 from 'md5';
import { SettingsContext } from '../Settings';
import { RouteChildrenProps } from 'react-router';

type BannerProps = {
  size?: 'large';
  children: ReactNode;
};

function Banner({ children, size }: BannerProps) {
  return (
    <div className="container">
      <div className="content">{children}</div>
      <style jsx>{`
        .container {
          margin: 24px 24px 12px 24px;
          text-align: center;
          border-top: 1px solid ${theme.BLUEGRAY_COLOR_LIGHT};
          border-bottom: 1px solid ${theme.BLUEGRAY_COLOR_LIGHT};
          font-size: ${size === 'large' ? '18px' : 'unset'};
          font-weight: ${size === 'large' ? '600' : 'unset'};
        }
        .content {
          margin: 24px 0;
        }
        .separator {
          display: inline-block;
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
}
type UniqueCodeProps = {
  configurationId?: string;
};

function UniqueCode({ configurationId }: UniqueCodeProps) {
  return (
    <div>
      Your unique code <strong>{configurationId}</strong>
    </div>
  );
}

function RequestQuoteForm({ history }) {
  return (
    <form>
      <Banner size="large">Request Quote</Banner>
      <div className="instructions">
        Get a quote for <strong>your</strong> personalized hearing aid today.
      </div>
      <FormField label="Name" placeholder="Enter your full name" />
      <FormField label="Email" placeholder="Enter your email" />
      <Button
        color="dark"
        onClick={() => history.push('/request-quote')}
        type="button"
      >
        Request a quote
      </Button>
      <style jsx>{`
        form {
          padding: 6px 20px 20px 20px;
          box-shadow: ${theme.LIST_SHADOW};
        }
        .instructions {
          margin-top: 1.5em;
          margin-bottom: 12px;
          font-size: 12px;
        }
      `}</style>
    </form>
  );
}

function AlternativeQuoteForm({ configurationId, history }) {
  return (
    <div className="form">
      <Banner size="large">Find partner</Banner>
      <div className="instructions">
        <Image
          src={`${process.env.PUBLIC_URL}/earth.png`}
          width={553}
          height={286}
          alt="map of earth"
        />
        <div>
          You can also use your unique code <strong>{configurationId}</strong>{' '}
          with any of our authorized partners.
        </div>
      </div>
      <Button color="light" onClick={() => history.push('/find-partner')}>
        Find nearest partner
      </Button>
      <style jsx>{`
        .form {
          margin-top: 2em;
          margin-bottom: 2em;
          padding: 6px 20px 20px 20px;
          box-shadow: ${theme.LIST_SHADOW};
        }
        .instructions {
          margin: 1em 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
type Configuration = {
  brochureModel?: Value;
  sections?: Section[];
  configurationId?: string;
};

function SummaryPage({ history }: RouteChildrenProps) {
  const settings = useContext(SettingsContext);
  const [configuration, setConfiguration] = useState<Configuration>({
    sections: null,
    brochureModel: null,
    configurationId: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let session = store.get();

    if (!session) {
      setError({ error: 'SESSION_EXPIRED' });
      return;
    }

    async function fetchConfiguration() {
      const result = await getConfiguration(
        session.brochureModelId,
        session.assignments,
        settings.packagePath
      );

      setConfiguration({
        sections: result.sections,
        brochureModel: result.brochureModel,
        configurationId: md5(JSON.stringify(session.assignments)).substring(
          0,
          6
        )
      });
    }
    fetchConfiguration();
  }, [settings.packagePath]);

  const { sections, brochureModel, configurationId } = configuration;

  if (error) {
    return <div>Error: Session expired, try again!</div>;
  }
  if (!brochureModel || !sections) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <header>
        <h2>
          <strong>Your</strong> {brochureModel.name}
        </h2>
        <UniqueCode configurationId={configurationId} />
      </header>
      <div className="summary">
        <div className="left">
          <Banner size="large">Summary</Banner>
          <Selections sections={sections} layout="large" />
          <Banner>
            <UniqueCode configurationId={configurationId} />
          </Banner>
        </div>
        <div className="right">
          <RequestQuoteForm history={history} />
          <AlternativeQuoteForm
            configurationId={configurationId}
            history={history}
          />
        </div>
      </div>

      <style jsx>{`
        small {
          text-align: right;
          display: block;
        }
        .summary {
          display: flex;
          min-width: 400px;
          margin: 0 auto;
          flex-direction: row;
        }
        .left {
          margin-right: 2em;
          padding: 6px 16px 32px 16px;
          border-radius: 4px;
          box-shadow: ${theme.LIST_SHADOW};
          flex: 2;
          margin-bottom: 2em;
        }
        .right {
          flex: 1;
        }
        header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        @media screen and (max-width: 800px) {
          .summary {
            flex-direction: column;
          }
          .left {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default SummaryPage;
