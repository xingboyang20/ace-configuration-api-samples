import React from 'react';
import classnames from 'classnames';
import './Tabs.css';

const tabClassName = (index, activeTabIndex) =>
  classnames('tabs-tab', { 'tabs-tab-active': index === activeTabIndex });

/**
 * `<Tabs>` component renders tab items for each item in `tabs` props.
 */
const Tabs = ({
  tabs,
  isScopeComplete,
  isScopeLocked,
  onToggleIsScopeLocked,
  activeTabIndex,
  onTabChange,
  children
}) => {
  const isActiveTabScopeTab = tabs[0] === 'Scope' && activeTabIndex === 0;

  return (
    <>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            className={tabClassName(index, activeTabIndex)}
            key={tab + index}
            onClick={_ => onTabChange(index)}
            disabled={index > 0 && (!isScopeComplete || !isScopeLocked)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children}
        {isActiveTabScopeTab && (isScopeComplete || isScopeLocked) ? (
          <button onClick={onToggleIsScopeLocked}>
            {isScopeLocked ? 'Unlock scope' : 'Lock scope'}
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Tabs;
