import React from 'react'

export default function Image({url, opacity, parallaxPos, scale, rotationPosition}) {
  return (
    <img 
      src={url}
      style={{
          opacity,
          transform: `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0px) scale(${scale}) rotate(${rotationPosition}deg)`,
      }}
    
    />
  )
}
