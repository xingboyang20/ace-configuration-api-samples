import React from 'react';
import { Link } from 'react-router-dom';
import * as theme from './theme';
import { ReactComponent as SearchIcon } from './Icons/Search.svg';

function Title({ title, subTitle }) {
  return (
    <div className="title-container">
      <a href="/" className="title">
        {title}
      </a>

      {subTitle && <span className="subTitle">{subTitle}</span>}
      <style jsx>{`
        .title-container {
          display: flex;
          flex-direction: row;
          align-items: baseline;
        }
        .title {
          display: inline-block;
          text-decoration: none;
          font-size: 18px;
          color: ${theme.TEXT_COLOR};
          font-weight: 600;
        }

        .subTitle {
          color: ${theme.BLUEGRAY_COLOR_MEDIUM};
          vertical-align: middle;
          margin-left: 6px;
        }
      `}</style>
    </div>
  );
}

function NavLink({ href, title, isActive = false }) {
  const className = isActive ? 'active' : undefined;

  return (
    <Link to={href} className={className}>
      {title}
    </Link>
  );
}

export function NavBar({ children }) {
  return (
    <ul className="topNav">
      {React.Children.map(children, (child, idx) => (
        <li key={idx}>{child}</li>
      ))}
      <style jsx>{`
        .topNav {
          display: inline-block;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .topNav > li {
          display: inline-block;
        }
        .topNav > li > :global(a) {
          display: inline-block;
          font-size: 14px;
          line-height: 32px;
          letter-spacing: 0.2px;
          margin-right: 24px;
          text-decoration: none;
          color: ${theme.BLUEGRAY_COLOR_MEDIUM};
          transition: color ${theme.COLOR_TRANSITION_DURATION};
        }
        .topNav > li:last-child > :global(a) {
          margin-right: 0;
        }
        .topNav > li > :global(a:hover),
        .topNav > li > :global(a:focus) {
          color: ${theme.TEXT_COLOR};
          outline: none;
        }
        .topNav > li > :global(a:active),
        .topNav > li > :global(a.active) {
          color: ${theme.TEXT_COLOR};
          font-weight: 600;
        }
      `}</style>
    </ul>
  );
}

function TopNav({ active }) {
  return (
    <NavBar>
      <NavLink
        href="/"
        title="Home"
        isActive={active === '/home' || active === '/'}
      />
      <NavLink
        href="/all-products"
        isActive={active === '/products'}
        title="Products"
      />
      <NavLink
        href="/contact"
        title="Contact"
        isActive={active === '/contact'}
      />
      <NavLink
        href="/search"
        title={
          <SearchIcon
            stroke={theme.TEXT_COLOR}
            strokeWidth="2px"
            width="16px"
            height="16px"
          />
        }
      />
    </NavBar>
  );
}

class AppBar extends React.Component<{
  title: string;
  subTitle: string;
  active: string;
}> {
  render() {
    const { title, subTitle, active } = this.props;

    return (
      <header>
        <div className="logo">
          <Title title={title} subTitle={subTitle} />
        </div>
        <div className="nav-and-avatar">
          <TopNav active={active} />
        </div>
        <style jsx>{`
          header {
            display: flex;
            padding: 20px 0px 30px 0px;
          }
          .logo {
            flex: 1;
            white-space: nowrap;
            align-self: center;
          }
          .nav-and-avatar {
            align-self: center;
            height: 32px;
            white-space: nowrap;
          }
          @media print {
            header {
              display: none;
            }
          }
        `}</style>
      </header>
    );
  }
}

export default AppBar;
