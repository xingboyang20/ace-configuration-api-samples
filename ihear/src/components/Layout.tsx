import React from 'react';
import * as theme from './theme';
class Layout extends React.Component<{
  header: React.ReactNode;
  footer: React.ReactNode;
}> {
  render() {
    const { children, header, footer } = this.props;
    return (
      <div className="layout">
        <div className="header">{header}</div>

        <main className="content">{children}</main>

        <footer className="footer">{footer}</footer>

        <style jsx>{`
          .layout {
            height: 100vh;
            display: grid;
            grid-gap: 0;
            padding: 0 20px;
            grid-template-rows: 52px 1fr 250px;
            grid-template-columns: auto;
            grid-template-areas:
              'header'
              'content'
              'footer';
          }
          .header {
            grid-area: header;
            z-index: ${theme.APPBAR_ZINDEX};
          }
          .content {
            grid-area: content;
            margin-bottom: 80px;
          }
          .footer {
            grid-area: footer;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
