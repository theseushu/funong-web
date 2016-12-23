import React from 'react';
export default () =>
  <svg
    x="0px"
    y="0px"
    viewBox="0 0 80 0.5"
  >
    <rect
      x="1"
      fill="#c6c3b9"
      width="16"
      height=".5"
    >
      <animate
        attributeName="x"
        attributeType="XML"
        values="1; 64; 1"
        begin="0s" dur="1.5s" repeatCount="indefinite"
      />
    </rect>
  </svg>
;
