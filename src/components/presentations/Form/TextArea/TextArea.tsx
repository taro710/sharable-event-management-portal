'use client';

import { forwardRef, useId } from 'react';

import style from './TextArea.module.scss';

type Props = JSX.IntrinsicElements['textarea'] & {
  label: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { label, ...inputProps } = props;

  const id = useId();

  return (
    <div className={style['input-component']}>
      <label aria-hidden className={style.caption} htmlFor={id}>
        {label}
      </label>
      <textarea
        {...inputProps}
        aria-label={label}
        className={style.input}
        id={id}
        ref={ref}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
