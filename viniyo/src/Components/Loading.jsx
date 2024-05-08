import React from 'react'

function Loading() {
  return (
    <div>Loading
        <div className="position-fixed w-full text-center loading"  style={{
        background: "transparent",
        color: "black",
        top: 0,
        left: 0,
        opacity: 50,
        zIndex: 9,
      }}>
         <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#fff"
          fill="none"
          points="20,1 40,40 1,40"
        ></polygon>
        <text fill="#fff" x="5" y="47">
          Loading
        </text>
      </svg>
    </div>
      </div>
    
  )
}

export default Loading