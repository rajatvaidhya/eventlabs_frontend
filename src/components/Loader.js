import React from 'react'
import './Loader.css'

const Loader = (props) => {


  return (
    <div className="loader" style={{color:props.color}}></div>
  )
}

export default Loader