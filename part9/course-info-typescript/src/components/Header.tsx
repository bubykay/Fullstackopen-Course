import React from 'react';

interface header {
  courseName: string
}

const Header = ({courseName}:header) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

export default Header;