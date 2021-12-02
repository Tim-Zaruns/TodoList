import { FC } from 'react';

type Props = {
  checkboxValue: boolean,
  onChange: (checkboxValue: boolean) => void,
}

const Checkbox:FC<Props> = ({ checkboxValue, onChange }) => (
  <div>
    <input
      type="checkbox"
      checked={checkboxValue}
      onChange={(e) => onChange(e.target.checked)}
    />
  </div>
);

export default Checkbox;
