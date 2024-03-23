/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { logo } from 'src/assets/brand/logo'

import logoo from "../assets/images/logo.png"

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          {/* <CIcon icon={logo} size="lg" /> */}
          <img src={logoo} alt="Custom Logo" height={100} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logoo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeader>
        <CHeaderNav className="d-flex justify-content-center align-items-center">
  <CHeaderBrand style={{ 
    color: 'your_desired_color', 
    fontWeight: 'bold', 
    fontStyle: 'italic',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
  }}>
    HOSTELEASE MANAGEMENT SYSTEM
  </CHeaderBrand>
</CHeaderNav>

        <CHeaderNav className="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink to="/dashboard" component={NavLink}>
            Dashboard
          </CNavLink>
        </CNavItem>
        {/* Add more navigation items as needed */}
        </CHeaderNav>
        </CHeader>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
       <CHeaderBrand style={{ 
    color: 'your_desired_color', 
    fontWeight: 'bold', 
    fontStyle: 'normal',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
  }}>
    Welcome Admin Dashboard
  </CHeaderBrand>
       {/* <AppBreadcrumb /> */}
        
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
