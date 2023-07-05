import React from 'react'

export default function Demo({ src = '', title = '', name = '', price = 0 }) {
  return (
    <>
      <img src={src} alt={src} />
      <h4>{title}</h4>
      <p>{name}</p>
      <p>{price}</p>
    </>
  )
}
