import React from 'react';

const Header = ({ title }) => {
  // Hardcode split for animation on "MetricFunds" part of the title
  const mainAnimatedTitle = "MetricFunds";
  // Get the subtext (e.g., "Dashboard")
  const subText = title.replace(mainAnimatedTitle, "").trim(); 

  return (
    <header className="app-header">
      <h1>
        {/* Split the main part into two spans for sequential animation */}
        <span className="logo-part-1">Metric</span>
        <span className="logo-part-2">Funds</span>
        {' '}
        {subText}
      </h1>
    </header>
  );
};

export default Header;