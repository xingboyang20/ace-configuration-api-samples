import React from 'react';

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
            display: flex;
            flex-direction: column;
            padding: 0 20px;
          }
          .header {
            height: 52px;
          }
          .content {
            flex: 1;
            margin-bottom: 80px;
          }
          .footer {
            height: 250px;
            flex-shrink: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
