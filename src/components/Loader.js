import React from 'react'
import './Loader.css'
import { useLightMode } from '../contexts/LightModeContext'

const Loader = (props) => {

  const {toggleLightMode} = useLightMode();

  return (
    <div className="loader" style={{color:props.color}}></div>
  )
}

export default Loader