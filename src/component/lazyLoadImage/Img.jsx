import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
const Img = ({src,className}) => {
  return (
    <LazyLoadImage
        className={className || ""}
        effect='blur'
        src={src}
        alt=""
    />

  )
}

export default Img