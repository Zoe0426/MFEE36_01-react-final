import { useState } from 'react'
import validator from 'validator'

export default function FormFocus() {
  // 初始用物件，填入資料與呈現錯誤訊息均需要
  const initData = {
    username: '',
    password: '',
    email: '',
    password2: '',
    agree: false,
  }

  // 儲存表單各欄位填入資料用state
  const [data, setData] = useState(initData)

  // 儲存表單各欄位發生錯誤的訊息用state
  // 這裡調整agree需要是空白字串，它是用來記錄錯誤訊息用的
  const [errors, setErrors] = useState({ ...initData, agree: '' })

  // 所有欄位共用的事件處理函式
  const handleFieldChange = (e) => {
    if (e.target.name === 'agree')
      return setData({ ...data, agree: e.target.checked })

    return setData({ ...data, [e.target.name]: e.target.value })
  }

  // 判斷某欄位是否有發生驗証錯誤(有錯誤訊息)
  const hasError = (errors, fieldname) => {
    return !!errors[fieldname]
  }

  // 驗証所有欄位(或單一欄位)的函式
  const validateFields = (data, errors, fieldname = '') => {
    // 先建立空白的錯誤訊息，代表每次檢查均需重置所有錯誤訊息開始檢查起
    const newErrors = {}
    Object.keys(errors).forEach((prop) => (newErrors[prop] = ''))

    // 以下使用`||=`語法是同時間只有一個錯誤訊息，而且會寫在愈上面檢查的為主
    if (validator.isEmpty(data.username, { ignore_whitespace: true })) {
      newErrors.username ||= '帳號為必填欄位'
    }

    if (validator.isEmpty(data.password, { ignore_whitespace: true })) {
      newErrors.password ||= '密碼為必填欄位'
    }

    if (
      !validator.isStrongPassword(data.password, {
        minLength: 8, // 最小字元數
        minLowercase: 1, // 最少要幾個小寫英文字元
        minUppercase: 1, // 最少要幾個大寫英文字元
        minNumbers: 0, // 最少要幾個數字
        minSymbols: 0, // 最少要幾個符號
      })
    ) {
      newErrors.password ||=
        '密碼至少8個至多12個字元，而且至少需包含一個英文大寫與一個英文小寫字元'
    }

    if (data.password.length > 12) {
      newErrors.password ||= '密碼至多12個字元'
    }

    if (data.password !== data.password2) {
      newErrors.password ||= '密碼與確認密碼要一致'
      newErrors.password2 ||= '密碼與確認密碼要一致'
    }

    if (validator.isEmpty(data.email, { ignore_whitespace: true })) {
      newErrors.email ||= '電子郵件為必填欄位'
    }

    if (!validator.isEmail(data.email)) {
      newErrors.email ||= '電子郵件格式不正確'
    }

    if (!data.agree) {
      newErrors.agree ||= '需要同意會員註冊條款'
    }

    // 回傳視是單欄位檢查(blur)->回傳只改變此欄位errors物件
    // 還是全體檢查(submit)->回傳整個改變過errors物件
    return fieldname
      ? { ...errors, [fieldname]: newErrors[fieldname] }
      : newErrors
  }

  // 每欄位失焦時會進行該欄位的檢查，如果有錯誤會呈現，或是正確後消去錯誤訊息
  const handleBlur = (e) => {
    const newErrors = validateFields(data, errors, e.target.name)
    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const formdata = new FormData(e.target)
    const inputs = e.target.elements

    // 驗証錯誤後，呈現錯誤訊息
    const newErrors = validateFields(data, errors)
    setErrors(newErrors)

    // 對所有欄位進行迴圈，聚焦(focus)在第一個發生錯誤的欄位
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[i].nodeName === 'INPUT' &&
        hasError(newErrors, inputs[i].name)
      ) {
        inputs[i].focus()
        return // 這裡不用break，因為有找到錯誤，直接用return跳出此函式
      }
    }

    // 如果完全驗証後無錯誤，才會執行到這裡的程式碼
    alert('no error and submit to server')
  }

  return (
    <>
      <h1>FormFocus</h1>
      <style jsx>{`
        .error {
          color: red;
          font-size: 13px;
        }
      `}</style>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
          </label>
          <div className="error">{errors.username}</div>
        </div>
        <div>
          <label>
            電子郵件
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
          </label>
          <div className="error">{errors.email}</div>
        </div>
        <div>
          <label>
            密碼
            <input
              type="text"
              name="password"
              value={data.password}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
          </label>
          <div className="error">{errors.password}</div>
        </div>
        <div>
          <label>
            確認密碼
            <input
              type="text"
              name="password2"
              value={data.password2}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
          </label>
          <div className="error">{errors.password2}</div>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={data.agree}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            我同意會員註冊條款
          </label>
          <div className="error">{errors.agree}</div>
        </div>
        <button>送出</button>
      </form>
    </>
  )
}
