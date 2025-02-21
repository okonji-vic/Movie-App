import React from "react";
import "./Skeleton.css"; // Create this file

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-banner"></div>
      <div className="skeleton-content">
        <div className="skeleton-poster"></div>
        <div className="skeleton-text">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;