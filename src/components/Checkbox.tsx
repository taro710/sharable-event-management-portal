import clsx from 'clsx';

import style from './Checkbox.module.scss';

type Props = {
  label: string;
  index: number;
};
const Checkbox = ({ label, index }: Props) => {
  const isNoticed = index === 2 || index === 3;
  return (
    <label className={style['checkbox-component']}>
      <span className={clsx(style['text'], isNoticed && style['-noticed'])}>
        {label}
      </span>
      {isNoticed && (
        <div className={style['answer']}>
          <input type="checkbox" className={style['check']} />
          {/* <input type="checkbox" className={style['check2']} /> */}
          <p className={style['check2']}>×</p>
        </div>
      )}
    </label>
  );
};

export default Checkbox;
