import React from 'react'
import PropTypes from 'prop-types'

const Proggress = ({ percentage }) => {
  return (
    <div className='progress mt-2'>
      <div
        className='progress-bar progress-bar-striped bg-success'
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  )
}

Proggress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Proggress
