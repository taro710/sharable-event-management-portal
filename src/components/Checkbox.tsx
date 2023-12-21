import clsx from 'clsx';

import style from './Checkbox.module.scss';

type Props = {
  label: string;
  index: number;
};
const Checkbox = ({ label }: Props) => {
  return (
    <label className={style['checkbox-component']}>
      <div className={style['answer']}>
        <input type="checkbox" className={style['check']} />
      </div>

      <span className={clsx(style['text'])}>{label}</span>
    </label>
  );
};

export default Checkbox;
