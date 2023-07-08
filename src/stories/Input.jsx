import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

/**
 * Primary UI component for user interaction
 */
export const Input = ({ backgroundColor, size, fontSize, ...props }) => {
  return (
    <input
      style={backgroundColor && { backgroundColor }}
      {...props}
      type="text"
      className={[`input-${size}`, `font-size-${fontSize}`].join(' ')}
    />
  );
};

Input.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Input.defaultProps = {
  backgroundColor: null,
  size: 'medium',
};
