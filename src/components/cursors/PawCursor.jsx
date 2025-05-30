import React from 'react';
import { useCursorify } from '@cursorify/react'

const PawCursor = () => {
  const { mouseState } = useCursorify()

  return (
    <div
      style={{
        width: 32,
        height: 32,
        position: 'relative',
        pointerEvents: 'none',
        transform: mouseState === 'mouseDown' ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 0.1s ease',
      }}
    >
      <img 
        src="/figures/paws.png" 
        alt="paw cursor"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default PawCursor