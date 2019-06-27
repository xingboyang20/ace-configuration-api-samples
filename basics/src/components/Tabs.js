import React from 'react';
import classnames from 'classnames';
import './Tabs.css';

const tabClassName = (index, activeTabIndex) =>
  classnames('tabs-tab', { 'tabs-tab-active': index === activeTabIndex });

/**
 * `<Tabs>` component renders tab items for each item in `tabs` props.
 */
const Tabs = ({ tabs, activeTabIndex, onTabChange, children }) => {
  return (
    <>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            className={tabClassName(index, activeTabIndex)}
            key={tab + index}
            onClick={_ => onTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{children}</div>
    </>
  );
};

export default Tabs;
