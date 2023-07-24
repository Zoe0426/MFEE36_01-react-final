import { useState } from 'react';
import Styles from './numberInput.module.css';

export default function NumberInput({
  min = 1,
  defaultValue = 1,
  handleNumber = () => {},
}) {
  const [value, setValue] = useState(defaultValue);
  const updateValue = (type) => {
    const newValue =
      type === 'plus' ? value + 1 : value > min ? value - 1 : value;
    setValue(newValue);
    handleNumber(newValue);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const reisNumber = /[.\d]*/;
    if (reisNumber.test(inputValue)) {
      setValue(inputValue !== '' ? parseInt(inputValue) : '');
      handleNumber(inputValue !== '' ? parseInt(inputValue) : '');
    }
  };
  const handleBlur = () => {
    const newValue = isNaN(value) || value === '' ? 1 : value;
    setValue(newValue);
    handleNumber(newValue);
  };
  console.log();

  return (
    <div className={Styles.numInputBlock}>
      <button className={Styles.minusBtn} onClick={() => updateValue('minus')}>
        -
      </button>
      <input
        type="text"
        className={Styles.input}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button className={Styles.addBtn} onClick={() => updateValue('plus')}>
        +
      </button>
    </div>
  );
}
