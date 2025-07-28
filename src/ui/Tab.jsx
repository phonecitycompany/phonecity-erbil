import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TabHeader = ({ value, label, activeTab, onClickFunc, setCurrentTab, activeTabClassName, nonActiveTabClassName }) => {
  const activeStyle = `w-full bg-white rounded-t-xl text-xl lg:text-3xl py-5 ${activeTabClassName} `;
  const nonActiveStyle = `w-full text-xl lg:text-3xl py-5 ${nonActiveTabClassName}`;
  return (
    <button
      className={value == activeTab ? activeStyle : nonActiveStyle}
      name={value}
      onClick={() => {
        if (onClickFunc) {
          onClickFunc(value)
        }
        setCurrentTab(value);

      }}
    >
      <span className="ml-2">{label}</span>
    </button>
  );
};

export function TabHeaders({ currentTab, tabs, onClickFunc, setCurrentTab, activeTabClassName, nonActiveTabClassName }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex w-full flex-row space-x-0 ">
      {tabs?.map(tab => {
        return (
          <TabHeader
            key={tab.value}
            tabHeaderCount={tabs.length}
            value={tab.value}
            label={tab.label}
            activeTab={currentTab}
            onClickFunc={onClickFunc}
            setCurrentTab={setCurrentTab}
            activeTabClassName={activeTabClassName}
            nonActiveTabClassName={nonActiveTabClassName}
          />
        );
      })}
    </div>
  );
}
export function TabContent(
  { children, cuurentTab }
) {


  return (
    <div className="h-full w-full bg-white px-5 pb-5 pt-8 ">
      {React.Children.map(children, (child, index) => {

        if (child.props.tabvalue == cuurentTab) {
          return (
            <div key={index} className="individual-child">
              {child}
            </div>
          );
        } else {
          return null; // Render nothing if tabValue doesn't match
        }
      })}

    </div >
  );
}
