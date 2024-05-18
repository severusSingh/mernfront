import React from 'react'
import { Link } from 'react-router-dom'

const errorPage = () => {
  return (
  <section className='error-page'>
    <div className='err-center'>
      <h2>Uh oh! Something went wrong! <br /> Page not found! </h2>
      <Link to="/" className='err-btn'>Go Back Home</Link>
    </div>
  </section>
  )
}

export default errorPage
