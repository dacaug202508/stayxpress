import React from 'react'

function Button({text, onClick, css, type}) {
  return (
    <div>
            <button type={type} onClick={onClick} className={`${css}`}>{text}</button>
    </div>
  )
}

export default Button