import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Page() {
  const { query, asPath } = useRouter()

  const [user, setUser] = useState({ id: '', name: '', age: 0 })

  // 與伺服器相連獲得資料的函式
  const getUsers = async (id) => {
    const response = await axios.get(
      `https://my-json-server.typicode.com/eyesofkids/json-fake-data/users/${id}`
    )

    console.log(response.data)

    setUser(response.data)
  }

  // mount(after):初次渲染之後
  useEffect(() => {
    console.log(query)
    const { id } = query

    if (id) {
      getUsers(id)
    }
  }, [query])

  return (
    <>
      <h1>Page</h1>
      <p>Path:{asPath}</p>
      <p>
        ID:{user.id} / 姓名: {user.name} / 年紀: {user.age}
      </p>
    </>
  )
}
