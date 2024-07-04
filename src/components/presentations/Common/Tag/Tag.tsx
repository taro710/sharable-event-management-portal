'use client';

import clsx from 'clsx';

import style from './Tag.module.scss';

type Props = JSX.IntrinsicElements['button'] & {
  text: string;
  isActive?: boolean;
};
const Tag = ({ text, isActive, ...buttonProps }: Props) => (
  <button
    {...buttonProps}
    className={clsx(style['tag-component'], isActive && style['-active'])}
    type="button">
    <span className={style.text}>{text}</span>
  </button>
);

export default Tag;
