import { useState } from 'react';
import Styles from './numberInput2.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function NumberInput({
  title = '',
  min = 1,
  defaultValue = 1,
  needMax = false,
  maxValue = 0,
  handleNumber = () => {},
}) {
  // console.log(maxValue);
  const [value, setValue] = useState(defaultValue);
  const [isExceedingMaxValue, setIsExceedingMaxValue] = useState(false); // 新增狀態
  const updateValue = (type) => {
    if (needMax) {
      if (type === 'plus' && value + 1 > maxValue) {
        setIsExceedingMaxValue(true);
        return;
      }
      const newValue =
        type === 'plus' && !isExceedingMaxValue
          ? value + 1
          : value > min
          ? value - 1
          : value;
      setValue(newValue);
      handleNumber(newValue);
      setIsExceedingMaxValue(newValue > maxValue);
    } else {
      const newValue =
        type === 'plus' ? value + 1 : value > min ? value - 1 : value;
      setValue(newValue);
      handleNumber(newValue);
    }
  };

  // const handleChange = (e) => {
  //   const inputValue = e.target.value;
  //   const reisNumber = /^[.\d]*$/;
  //   if (reisNumber.test(inputValue)) {
  //     const numericValue = parseInt(inputValue); // 將輸入轉換為數字
  //     if (!isNaN(numericValue) && numericValue <= maxValue) {
  //       setValue(numericValue);
  //       handleNumber(numericValue);
  //       if (needMax) {
  //         setIsExceedingMaxValue(false);
  //       }
  //     } else {
  //       setIsExceedingMaxValue(true);
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const reisNumber = /^[.\d]*$/;
    if (reisNumber.test(inputValue)) {
      const numericValue = parseInt(inputValue); // 將輸入轉換為數字
      if (!isNaN(numericValue) && numericValue <= maxValue) {
        setValue(numericValue);
        handleNumber(numericValue);
        if (needMax) {
          setIsExceedingMaxValue(false);
        }
      } else {
        setIsExceedingMaxValue(true);
        // 如果輸入值超過最大值，則將輸入值重設為預設值 (即1)
        setValue(defaultValue);
        handleNumber(defaultValue);
      }
    }
  };

  // console.log(isExceedingMaxValue);
  const handleBlur = () => {
    const newValue = isNaN(value) || value === '' ? 1 : value;
    setValue(newValue);
    handleNumber(newValue);
  };

  return (
    <>
      {' '}
      <div className={Styles.title_area}>
        <div className={Styles.title}>{title}</div>
        {needMax &&
          maxValue > 0 && ( // 判斷是否有 maxValue 且大於 0，有才顯示剩餘人數
            <div className={Styles.rest}> (剩餘: {maxValue - value}位) </div>
          )}{' '}
      </div>
      <div
        className={
          isExceedingMaxValue ? Styles.alert_input : Styles.numInputBlock
        }
      >
        <button
          className={Styles.minusBtn}
          onClick={() => updateValue('minus')}
        >
          -
        </button>

        <input
          type="text"
          // className={Styles.input}
          className={Styles.input} // 應用紅色樣式
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button
          //   className={Styles.addBtn}
          className={isExceedingMaxValue ? Styles.disable : Styles.addBtn}
          onClick={() => updateValue('plus')}
        >
          +
        </button>
      </div>
      {isExceedingMaxValue && (
        <div className={Styles.exceedingMessage}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className={Styles.alert_icon}
          />
          超過剩餘人數
        </div>
      )}
    </>
  );
}
