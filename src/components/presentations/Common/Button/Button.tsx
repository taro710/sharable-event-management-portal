'use client';

import clsx from 'clsx';

import style from './Button.module.scss';

type Props = JSX.IntrinsicElements['button'] & {
  text: string;
  theme?: 'primary' | 'secondary';
  width?: number;
  isAlert?: boolean;
};
const Button = ({
  text,
  theme = 'primary',
  width,
  isAlert,
  ...inputProps
}: Props) => (
  <button
    {...inputProps}
    className={clsx(
      style['button-component'],
      theme !== 'primary' && style[`-${theme}`],
      isAlert && style['-alert'],
    )}
    style={{ width: `${width}px` }}
    type="button">
    {text}
  </button>
);

export default Button;
