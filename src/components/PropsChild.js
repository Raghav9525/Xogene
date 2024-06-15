

import React from 'react'

function PropsChild(props) {
    console.log(props)
    const {a,b} = props
  return (
    <div>
        {a+b}

    </div>
  )
}

export default PropsChild