import clsx from 'clsx';

import style from './Tag.module.scss';

type Props = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};
const Tag = ({ text, isActive, onClick }: Props) => {
  return (
    <div
      className={clsx(style['tag-component'], isActive && style['-active'])}
      onClick={onClick}>
      <span className={style['text']}>{text}</span>
    </div>
  );
};

export default Tag;
