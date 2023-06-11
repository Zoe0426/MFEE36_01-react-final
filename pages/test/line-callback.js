import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LineCallback() {
  const [profile, setProfile] = useState({ name: '', picture: '' })

  const { asPath, query } = useRouter()
  // window object get only in useEffect
  useEffect(() => {
    console.log(asPath)

    console.log(query)

    const url = window.location.href
    console.log(url)

    const params = new URL(document.location).searchParams
    const code = params.get('code')
    const state = params.get('state')

    const cbUrl = `http://localhost:3005/api/auth/line-callback?code=${code}&state=${state}`
    console.log(cbUrl)

    axios.get(cbUrl, { withCredentials: true }).then((res) => {
      console.log(res.data.id_token)
      const { name, picture } = res.data.id_token
      setProfile({ name, picture })
    })
  }, [])

  return (
    <>
      <h1>LineCallback</h1>
      <p>Name: {profile.name}</p>
      <p>Picture: {profile.picture}</p>
    </>
  )
}
