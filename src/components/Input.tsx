import { FC } from 'react';

type InputType = {
  inputValue: string
  onChange: (inputValue: string) => void,
  placeholder: string,
}

const Input:FC<InputType> = ({ inputValue, onChange, placeholder }) => (
  <input
    type="text"
    value={inputValue}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

export default Input;
