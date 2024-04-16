'use client';

import clsx from 'clsx';

import style from './Button.module.scss';

type Props = {
  text: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
};
const Button = ({ text, type = 'primary', onClick }: Props) => {
  return (
    <button
      className={clsx(
        style['button-component'],
        type !== 'primary' && style[`-${type}`],
      )}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
