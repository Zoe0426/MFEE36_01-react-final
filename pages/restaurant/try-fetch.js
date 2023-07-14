import { useEffect, useState } from 'react';

export default function TestFetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/restaurant-api', {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        setData(obj);
      });
  }, []);

  return (
    <>
      {data.map((v) => {
        const { rest_sid, name, city, area, rule_name, service_name } = v;
        return (
          <p key={rest_sid}>
            {name},{city},{area},{rule_name},{service_name}
          </p>
        );
      })}
    </>
  );
}