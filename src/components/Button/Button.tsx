import React, { MouseEventHandler } from 'react';
import './Button.Style.css';

type GroupType = 'SaveEdit' | 'Close' | 'Cancle';

type ButtonType = 'submit' | 'reset' | 'button';

type SizeType = 'M' | 'L';

export const Button = ({
  children,
  type,
  size,
  gruop,
  on_Click,
  disabled,
}: {
  children: JSX.Element | string;
  type: ButtonType;
  size: SizeType;
  gruop: GroupType;
  on_Click?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className={`button button_${size} button_${gruop} `}
      onClick={on_Click}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
