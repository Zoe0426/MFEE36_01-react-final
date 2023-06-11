import { useEffect } from 'react'
import axios from 'axios'

export default function LineTest() {
  useEffect(() => {
    const cbUrl = `http://localhost:3005/api/auth/test`
    console.log(cbUrl)

    axios.get(cbUrl, { withCredentials: true }).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <>
      <h1>LineTest</h1>
    </>
  )
}
