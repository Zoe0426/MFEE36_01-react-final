import React from 'react'
import PropTypes from 'prop-types'

export default function CTAButton({ color }) {
  return <button style={{ backgroundColor: color }}>CTAButton</button>
}

CTAButton.propTypes = {
  color: PropTypes.string,
}
