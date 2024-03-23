import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import axios from 'axios'

import './styles.css'

const GymRegistration = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchGymRegistrationData()
  }, [])

  const fetchGymRegistrationData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/gymregistrationapplications')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching gym registration data:', error)
    }
  }

  const handleApprove = async (student) => {
    try {
      const response = await axios.post('http://localhost:4000/api/registerstudentforgym', student)
      if (response.data.success) {
        // Remove the approved student from the data array
        const updatedData = data.filter((s) => s.rollnumber !== student.rollnumber)
        setData(updatedData)

        // Delete the approved student from the gymregistrationapplications table
        await axios.delete(
          `http://localhost:4000/api/gymregistrationapplications/${student.rollnumber}`,
        )

        alert(
          'Student request has been approved successfully and deleted from the application list',
        )
      } else {
        console.error('Error approving student:', response.data.message)
        // Optionally, show an error message or perform other actions
      }
    } catch (error) {
      console.error('Error approving student:', error)
      // Optionally, show an error message or perform other actions
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>
              GYM Registration Applications
            </strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Batch</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((student, index) => (
                  <CTableRow key={index + 1}>
                    <CTableHeaderCell scope="row">{student.rollnumber}</CTableHeaderCell>
                    <CTableDataCell>{student.email}</CTableDataCell>
                    <CTableDataCell>{student.batch}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        className="mr-1"
                        onClick={() => handleApprove(student)}
                      >
                        Approve
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GymRegistration
