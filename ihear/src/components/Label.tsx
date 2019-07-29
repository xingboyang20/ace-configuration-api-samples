import React from 'react';

type LabelProps = {
  text: string;
  children: React.ReactNode;
};

function Label({ text, children }: LabelProps) {
  return (
    <label className="label">
      <span className="text">{text}</span>
      {children}
      <style jsx>{`
        .label {
          cursor: pointer;
        }
        .text {
          font-size: 14px;
          display: inline-block;
          white-space: normal;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      `}</style>
    </label>
  );
}

export default Label;
