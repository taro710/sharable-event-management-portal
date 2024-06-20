'use client';

import clsx from 'clsx';

import style from './Button.module.scss';

type Props = {
  text: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
  width?: number;
  isAlert?: boolean;
};
const Button = ({ text, type = 'primary', onClick, width, isAlert }: Props) => {
  return (
    <button
      className={clsx(
        style['button-component'],
        type !== 'primary' && style[`-${type}`],
        isAlert && style['-alert'],
      )}
      style={{ width: `${width}px` }}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
