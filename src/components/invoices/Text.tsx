import React from 'react';

type TextProps = {
  caption: string;
  className?: string;
};

const Text: React.FC<TextProps> = ({ className = '', caption }) => {
  return <span className={className}>{caption}</span>;
};

export default Text;
