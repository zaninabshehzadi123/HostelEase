import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import './alert.css'

const ComplaintsScreen = () => {
  const [complaints, setComplaints] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/complaints')
        setComplaints(response.data)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      }
    }

    fetchComplaints()
  }, [])

  const handleStatusChange = async (complaint, newStatus) => {
    const { id, roll_no, title, description, category } = complaint
    try {
      await axios.put(`http://localhost:4000/api/Updatecomplaints/status`, {
        status: newStatus,
        roll_no,
        title,
        description,
        category,
      })
      setSuccessMessage(`Status of complaint with ID ${id} updated successfully.`)
      // Update the status in the frontend state if needed
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (complaint) => {
    const { roll_no, title, description, category } = complaint
    try {
      await axios.delete('http://localhost:4000/api/Deletecomplaints', {
        data: { roll_no, title, description, category },
      })
      setSuccessMessage('Complaint deleted successfully.')
      // Remove the complaint from the frontend state if needed
    } catch (error) {
      console.error('Error deleting complaint:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>COMPLAINTS SCREEN</strong>
          </CCardHeader>
          <CCardBody>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Roll Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {complaints.map((complaint) => (
                  <CTableRow key={complaint.id}>
                    <CTableDataCell>{complaint.roll_no}</CTableDataCell>
                    <CTableDataCell>{complaint.title}</CTableDataCell>
                    <CTableDataCell>{complaint.description}</CTableDataCell>
                    <CTableDataCell>{complaint.category}</CTableDataCell>
                    <CTableDataCell>{complaint.created_at}</CTableDataCell>
                    <CTableDataCell>{complaint.status}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="primary">Updated</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem
                            onClick={() => handleStatusChange(complaint, 'Processing')}
                          >
                            Processing
                          </CDropdownItem>
                          <CDropdownItem onClick={() => handleDelete(complaint)}>
                            Delete
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
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

export default ComplaintsScreen
