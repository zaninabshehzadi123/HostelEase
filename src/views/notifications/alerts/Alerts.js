/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import './alert.css'
const initialData = [
  { id: 1, name: 'Mark', rollNo: 'A123', phoneNumber: '123-456-7890', complaint: 'No issues', status: 'Pending' },
  { id: 2, name: 'Jacob', rollNo: 'B456', phoneNumber: '987-654-3210', complaint: 'Technical difficulties', status: 'Pending' },
  { id: 3, name: 'Larry', rollNo: 'C789', phoneNumber: '555-123-4567', complaint: 'Late submission of assignments', status: 'Pending' },
  { id: 4, name: 'Alice', rollNo: 'D123', phoneNumber: '111-222-3333', complaint: 'No response from faculty', status: 'Pending' },
  { id: 5, name: 'Bob', rollNo: 'E456', phoneNumber: '444-555-6666', complaint: 'Excessive workload', status: 'Pending' },
  { id: 6, name: 'Charlie', rollNo: 'F789', phoneNumber: '777-888-9999', complaint: 'No access to study materials', status: 'Pending' },
  { id: 7, name: 'David', rollNo: 'G123', phoneNumber: '000-999-8888', complaint: 'Class scheduling issues', status: 'Pending' },
  { id: 8, name: 'Eve', rollNo: 'H456', phoneNumber: '123-987-4567', complaint: 'Grading discrepancies', status: 'Pending' },
];

const StudentPortfolio = () => {
  const [data, setData] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintResult, setComplaintResult] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setSelectedStudent(null); // Clear the selected student after deletion
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteSelected = () => {
    if (selectedStudent) {
      const confirmDelete = window.confirm('Are you sure you want to delete this record?');
      if (confirmDelete) {
        handleDelete(selectedStudent.id);
      }
    }
  };

  const handleStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setStatusVisible(true);
  };

  const handleComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setVisible(true);
  };

  const handleAcceptReject = (result) => {
    setComplaintResult(result);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedComplaint.id ? { ...item, status: result } : item
      )
    );
    setVisible(false);
    setStatusVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>COMPLAINTS RECORD</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Complaint</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((student, index) => (
                  <CTableRow
                    key={student.id}
                    active={selectedStudent && selectedStudent.id === student.id}
                    onClick={() => handleRowClick(student)}
                    color={selectedStudent && selectedStudent.id === student.id ? 'warning' : ''}
                  >
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{student.name}</CTableDataCell>
                    <CTableDataCell>{student.rollNo}</CTableDataCell>
                    <CTableDataCell>{student.phoneNumber}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        onClick={() => handleComplaint(student)}
                      >
                        Complaint
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        size="sm"
                        onClick={() => handleStatus(student)}
                      >
                        Status
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          <div className="d-flex justify-content-center mb-3">
  <CButton
    className="custom-delete-button" // Add your custom class
    style={{
      background: 'linear-gradient(45deg, #808080, #001f3f)', // Gradient of grey and dark blue
      color: 'white', // Custom text color
      border: '1px solid darkred', // Custom border
      borderRadius: '5px', // Custom border radius
      fontSize: '18px', // Custom font size
      padding: '10px 20px', // Custom padding
    }}
    size="sm"
    onClick={handleDeleteSelected}
  >
    Delete Record
  </CButton>
</div>


          </CCardBody>
        </CCard>
      </CCol>

      {/* Complaint Modal */}
      {/* {selectedComplaint && (
        <CModal
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="ComplaintModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="ComplaintModalLabel">Complaint Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              {selectedComplaint.name}'s Complaint: {selectedComplaint.complaint}
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={() => handleAcceptReject('accept')}>
              Accept
            </CButton>
            <CButton color="danger" onClick={() => handleAcceptReject('reject')}>
              Reject
            </CButton>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Status Modal */}
      {selectedComplaint && (
        <CModal
          scrollable
          visible={statusVisible}
          onClose={() => setStatusVisible(false)}
          aria-labelledby="StatusModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="StatusModalLabel">Complaint Status</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              {selectedComplaint.name}'s Complaint Status: {complaintResult}
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setStatusVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )} */}
    </CRow>
  );
};

export default StudentPortfolio;
