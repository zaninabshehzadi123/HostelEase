/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
} from '@coreui/react';

import './styles.css'

const initialData = [
  { id: 1, name: 'Mark', rollNo: 'A123', phoneNumber: '123-456-7890', cgpa: '3.8', status: null },
  { id: 2, name: 'Jacob', rollNo: 'B456', phoneNumber: '987-654-3210', cgpa: '3.5', status: null },
  { id: 3, name: 'Larry', rollNo: 'C789', phoneNumber: '555-123-4567', cgpa: '4.0', status: null },
  { id: 4, name: 'Alice', rollNo: 'D123', phoneNumber: '111-222-3333', cgpa: '3.9', status: null },
  { id: 5, name: 'Bob', rollNo: 'E456', phoneNumber: '444-555-6666', cgpa: '3.7', status: null },
  { id: 6, name: 'Charlie', rollNo: 'F789', phoneNumber: '777-888-9999', cgpa: '3.6', status: null },
  { id: 7, name: 'David', rollNo: 'G123', phoneNumber: '000-999-8888', cgpa: '3.8', status: null },
  { id: 8, name: 'Eve', rollNo: 'H456', phoneNumber: '123-987-4567', cgpa: '3.7', status: null },
];

const StudentPortfolio = () => {
  const [data, setData] = useState(initialData);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [requestOption, setRequestOption] = useState('');

  const handleRequest = (student) => {
    setSelectedStudent(student);
    setShowRequestModal(true);
  };

  const handleStatus = (id) => {
    const student = data.find((item) => item.id === id);
    if (student) {
      alert(`Room allotment request for ${student.name} (${student.rollNo}) : is ${student.status} `);
    } else {
      alert('No status available for this student.');
    }
  };

  const handleConfirm = () => {
    // Update the status based on the admin's response
    const updatedData = data.map((student) =>
      student.id === selectedStudent.id
        ? { ...student, status: requestOption === 'accept' ? 'Accepted' : 'Rejected' }
        : student
    );
    setData(updatedData);
    
    // Close the modal
    setShowRequestModal(false);
  };

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
                    <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">CGPA</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((student, index) => (
                    <CTableRow key={student.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{student.name}</CTableDataCell>
                      <CTableDataCell>{student.rollNo}</CTableDataCell>
                      <CTableDataCell>{student.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{student.cgpa}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          size="sm"
                          className="mr-1"
                          onClick={() => handleRequest(student)}
                        >
                          Request
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => handleStatus(student.id)}
                        >
                          Status
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
        <div className={`modal-overlay ${requestOption === 'right' ? 'right' : ''}`}>
          <div className="modal-content">
            <p>
              Do you want to accept or reject the room allotment request for {selectedStudent.name} (
              {selectedStudent.rollNo})?
            </p>
            <div className="mb-3">
              <input
                type="radio"
                id="accept"
                name="requestOption"
                value="accept"
                onChange={() => setRequestOption('accept')}
              />
              <label className="ml-2" htmlFor="accept">
                Accept
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="reject"
                name="requestOption"
                value="reject"
                onChange={() => setRequestOption('reject')}
              />
              <label className="ml-2" htmlFor="reject">
                Reject
              </label>
            </div>
            <div className="modal-buttons">
              <CButton color="secondary" onClick={() => setShowRequestModal(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={handleConfirm}>
                Confirm
              </CButton>
            </div>
          </div>
        </div>
      )}
    </CRow>
  );
};

export default StudentPortfolio;
