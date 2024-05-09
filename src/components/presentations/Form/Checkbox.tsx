'use client';

import clsx from 'clsx';

import style from './Checkbox.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};
const Checkbox = (props: Props) => {
  const { label, ...inputProps } = props;

  return (
    <label className={style['checkbox-component']}>
      <div className={style['answer']}>
        <input type="checkbox" className={style['check']} {...inputProps} />
      </div>

      <span className={clsx(style['text'])}>{label}</span>
    </label>
  );
};

export default Checkbox;
