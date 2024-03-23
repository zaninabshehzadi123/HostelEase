// import React, { useState, useEffect } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CButton,
// } from '@coreui/react'
// import axios from 'axios'

// import './styles.css'

// const StudentPortfolio = () => {
//   const [data, setData] = useState([])
//   const [showRequestModal, setShowRequestModal] = useState(false)
//   const [selectedStudent, setSelectedStudent] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/roomAllocationApplications')
//         setData(response.data)
//       } catch (error) {
//         console.error('Error fetching data:', error.message)
//       }
//     }
//     fetchData()
//   }, [])

//   const handleRequest = (student) => {
//     setSelectedStudent(student)
//     setShowRequestModal(true)
//   }

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader className="text-center">
//             <strong style={{ color: 'black', fontSize: '24px' }}>ROOM ALLOTMENT RECORDS</strong>
//           </CCardHeader>
//           <CCardBody>
//             <CTable striped>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Room Category</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Room Number</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {data.map((student, index) => (
//                   <CTableRow key={index + 1}>
//                     <CTableHeaderCell scope="row">{student.roll_number}</CTableHeaderCell>
//                     <CTableDataCell>{student.roomcategory}</CTableDataCell>
//                     <CTableDataCell>{student.roomnumber}</CTableDataCell>
//                     <CTableDataCell>
//                       <CButton
//                         color="primary"
//                         size="sm"
//                         className="mr-1"
//                         onClick={() => handleRequest(student)}
//                       >
//                         Approve
//                       </CButton>
//                     </CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>

//       {/* Request Modal */}
//       {showRequestModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <p>
//               Room allotment request for {selectedStudent.roll_number} : is{' '}
//               {selectedStudent.roomnumber}
//             </p>
//             <div className="modal-buttons">
//               <CButton color="secondary" onClick={() => setShowRequestModal(false)}>
//                 Close
//               </CButton>
//             </div>
//           </div>
//         </div>
//       )}
//     </CRow>
//   )
// }

// export default StudentPortfolio
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

const StudentPortfolio = () => {
  const [data, setData] = useState([])
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/roomAllocationApplications')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRequest = async (student) => {
    try {
      setSelectedStudent(student)
      setShowRequestModal(true)

      // Call the new API to search and convert the first "Applied" value into roll number
      const searchResponse = await axios.get('http://localhost:4000/api/searchRoomAllocation', {
        params: {
          roomcategory: student.roomcategory,
          roomnumber: student.roomnumber,
          rollnumber: student.roll_number, // Add rollnumber to the parameters
        },
      })

      // If the search was successful, proceed with the deletion
      if (searchResponse.data.rollNumber) {
        // Send the DELETE request to the server
        await axios.delete(
          `http://localhost:4000/api/roomAllocationApplications/${student.roll_number}`,
          {
            data: {
              roomcategory: student.roomcategory,
              roomnumber: student.roomnumber,
            },
          },
        )

        // Refresh the data after successful deletion
        fetchData()
      } else {
        console.error('No rollNumber found in the search response')
      }
    } catch (error) {
      console.error('Error handling room allocation:', error.message)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>ROOM ALLOTMENT RECORDS</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((student, index) => (
                  <CTableRow key={index + 1}>
                    <CTableHeaderCell scope="row">{student.roll_number}</CTableHeaderCell>
                    <CTableDataCell>{student.roomcategory}</CTableDataCell>
                    <CTableDataCell>{student.roomnumber}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        className="mr-1"
                        onClick={() => handleRequest(student)}
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

      {/* Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              Room allotment request for {selectedStudent.roll_number} : is{' '}
              {selectedStudent.roomnumber}
            </p>
            <div className="modal-buttons">
              <CButton color="secondary" onClick={() => setShowRequestModal(false)}>
                Close
              </CButton>
            </div>
          </div>
        </div>
      )}
    </CRow>
  )
}

export default StudentPortfolio
