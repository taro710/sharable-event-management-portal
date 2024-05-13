'use client';

import style from './Checkbox.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};
const Checkbox = (props: Props) => {
  const { label, ...inputProps } = props;

  return (
    <label className={style['checkbox-wrapper-15']}>
      <input
        className={style['inp-cbx']}
        type="checkbox"
        style={{ display: 'none' }}
        {...inputProps}
      />
      <span className={style['check']}>
        <svg>
          <polyline points="1 5 4 8 11 1" />
        </svg>
      </span>
      <span className={style['label']}>{label}</span>
    </label>
  );
};

export default Checkbox;
