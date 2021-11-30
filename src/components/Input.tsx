import { FC } from 'react';

type InputType = {
  inputValue: string
  onChange: (inputValue: string) => void,
}

const Input:FC<InputType> = ({ inputValue, onChange }) => (
  <input
    type="text"
    value={inputValue}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Input;
