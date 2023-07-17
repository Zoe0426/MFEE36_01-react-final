// export default App
import { useState } from 'react';

// chunk - 依size分成子陣列，ex. chunk([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
// https://stackoverflow.com/questions/8495687/split-array-into-chunks
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
//console.log(chunk([1, 2, 3, 4, 5], 2));

function App() {
  const [myYear, setMyYear] = useState(2023);
  const [myMonth, setMyMonth] = useState(7);

  // 一開始未選中日期
  const [myDate, setMyDate] = useState(0);

  // 呈現yearAndMonth
  const now = new Date();

  // 要得到今天的西元年使用Date物件的getFullYear()，要得到月份使用getMonth()(注意回傳為 0~11)
  const nowY = myYear ? myYear : now.getFullYear();

  // nowM =1-12
  const nowM = myMonth ? myMonth : now.getMonth() + 1; //注意回傳為 0~11

  // 呈現標題
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  // 本月有幾天
  // (上個月的最後一天是幾號)
  const days = new Date(nowY, nowM, 0).getDate();

  // 這個月的第一天是星期幾(0-6) (月份為0-11)
  const firstDay = new Date(nowY, nowM - 1, 1).getDay();

  // 本月所有日期的陣列資料
  const daysDataArray = [];

  // 補前面的空白資料
  for (let i = 0; i < firstDay; i++) {
    daysDataArray.push('');
  }

  // 加入本月所有的日期資料
  for (let i = 0; i < days; i++) {
    daysDataArray.push(i + 1);
  }

  // 準備要呈現在網頁上
  const daysDisplayArray = chunk(daysDataArray, 7);

  return (
    <>
      <h1>日曆</h1>
      <h2 id="yearAndMonth">{nowY + '/' + nowM}</h2>
      <table border="1">
        <thead id="title">
          <tr>
            {weekDayList.map(function (v, i) {
              return <th key={i}>{v}</th>;
            })}
          </tr>
        </thead>
        <tbody id="data">
          {daysDisplayArray.map((v, i) => {
            return (
              <tr key={i}>
                {v.map((item, idx) => (
                  <td key={idx}>
                    <a
                      href="#/"
                      onClick={() => {
                        setMyDate(item);
                      }}
                    >
                      {item}
                    </a>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
