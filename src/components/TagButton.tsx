'use client';

import clsx from 'clsx';

import style from './TagButton.module.scss';

type Props = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};
const TagButton = ({ text, isActive, onClick }: Props) => {
  return (
    <div className={style['tag-component']} onClick={onClick}>
      <div className={clsx(style['tag'], isActive && style['-active'])}>
        {text}
      </div>
    </div>
  );
};

export default TagButton;
