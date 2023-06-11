import axios from 'axios'

export default function LineLogin() {
  const goLogin = () => {
    axios
      .get('http://localhost:3005/api/auth/line-login', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.url)
        // redirect to line login page
        if (res.data.url) window.location.href = res.data.url
      })
  }
  return (
    <>
      <h1>LineLogin</h1>
      <button onClick={goLogin}>LINE</button>
    </>
  )
}
