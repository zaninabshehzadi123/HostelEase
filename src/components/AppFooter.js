/* eslint-disable prettier/prettier */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
         HOSTEL E3ASE
        </a>
        <span className="ms-1">&copy;  HOSTEL EASE.</span>
      </div>
      <div className="ms-auto">
       
        <a href="/" >
           Admin Dashboard 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
