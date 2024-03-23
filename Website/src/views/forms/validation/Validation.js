import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
  CButton,
} from '@coreui/react'

const StudentPortfolio = ({ day }) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    console.log('fetching meal....')
    try {
      const response = await axios.get('http://localhost:4000/api/meals')
      setData(response.data.meals)
      console.log(response)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdate = async (days, field) => {
    const newValue = prompt(`Enter new value for ${field}`)
    if (newValue !== null) {
      try {
        const response = await axios.put(`http://localhost:4000/api/meals/${days}`, {
          [field]: newValue,
        })
        console.log(response)
        // Refresh data after update
        fetchData()
      } catch (error) {
        console.error('Error updating data:', error)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>Meal booking RECORD</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Day</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Breakfast</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Lunch</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Dinner</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((meal, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{meal.days}</CTableDataCell>
                    <CTableDataCell>{meal.breakfast}</CTableDataCell>
                    <CTableDataCell>{meal.lunch}</CTableDataCell>
                    <CTableDataCell>{meal.dinner}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => handleUpdate(meal.days, 'breakfast')}
                        color="primary"
                        size="sm"
                      >
                        Update Breakfast
                      </CButton>
                      <CButton
                        onClick={() => handleUpdate(meal.days, 'lunch')}
                        color="primary"
                        size="sm"
                        className="ml-1"
                      >
                        Update Lunch
                      </CButton>
                      <CButton
                        onClick={() => handleUpdate(meal.days, 'dinner')}
                        color="primary"
                        size="sm"
                        className="ml-1"
                      >
                        Update Dinner
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

StudentPortfolio.propTypes = {
  day: PropTypes.string.isRequired,
}

export default StudentPortfolio
