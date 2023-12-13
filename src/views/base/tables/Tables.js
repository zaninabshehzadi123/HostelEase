/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
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

const PAGE_LIMIT = 5; // Number of records per page
const initialData = [
  { id: 1, name: 'Mark', rollNo: 'A123', phoneNumber: '123-456-7890', cgpa: '3.8' },
  { id: 2, name: 'Jacob', rollNo: 'B456', phoneNumber: '987-654-3210', cgpa: '3.5' },
  { id: 3, name: 'Larry', rollNo: 'C789', phoneNumber: '555-123-4567', cgpa: '4.0' },
  { id: 4, name: 'Alice', rollNo: 'D123', phoneNumber: '111-222-3333', cgpa: '3.9' },
  { id: 5, name: 'Bob', rollNo: 'E456', phoneNumber: '444-555-6666', cgpa: '3.7' },
  { id: 6, name: 'Charlie', rollNo: 'F789', phoneNumber: '777-888-9999', cgpa: '3.6' },
  { id: 7, name: 'David', rollNo: 'G123', phoneNumber: '000-999-8888', cgpa: '3.8' },
  { id: 8, name: 'Eve', rollNo: 'H456', phoneNumber: '123-987-4567', cgpa: '3.7' },
   { id: 9, name: 'Mark', rollNo: 'A123', phoneNumber: '123-456-7890', cgpa: '3.8' },
  { id: 10, name: 'Jacob', rollNo: 'B456', phoneNumber: '987-654-3210', cgpa: '3.5' },
  { id: 11, name: 'Larry', rollNo: 'C789', phoneNumber: '555-123-4567', cgpa: '4.0' },
  { id: 12, name: 'Alice', rollNo: 'D123', phoneNumber: '111-222-3333', cgpa: '3.9' },
  { id: 13, name: 'Bob', rollNo: 'E456', phoneNumber: '444-555-6666', cgpa: '3.7' },
  { id: 14, name: 'Charlie', rollNo: 'F789', phoneNumber: '777-888-9999', cgpa: '3.6' },
  { id: 15, name: 'David', rollNo: 'G123', phoneNumber: '000-999-8888', cgpa: '3.8' },
  { id: 16, name: 'Eve', rollNo: 'H456', phoneNumber: '123-987-4567', cgpa: '3.7' },
];
const StudentPortfolio = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRollNo, setUpdatedRollNo] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  const [updatedCgpa, setUpdatedCgpa] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * PAGE_LIMIT;
  const indexOfFirstRecord = indexOfLastRecord - PAGE_LIMIT;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPageCount = Math.ceil(data.length / PAGE_LIMIT);
  
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        // Assuming the response data is an array of student objects
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts
  const handleUpdate = () => {
    if (selectedRow !== null) {
      // Update the data in the state
      const updatedData = data.map((student) =>
        student.id === selectedRow
          ? {
              ...student,
              name: updatedName || student.name,
              rollNo: updatedRollNo || student.rollNo,
              phoneNumber: updatedPhoneNumber || student.phoneNumber,
              cgpa: updatedCgpa || student.cgpa,
            }
          : student
      );

      // Update the state with the new data
      setData(updatedData);

      // Close the modal
      setModalVisible(false);

      // Reset the selectedRow state
      setSelectedRow(null);

      // Reset the input fields
      setUpdatedName('');
      setUpdatedRollNo('');
      setUpdatedPhoneNumber('');
      setUpdatedCgpa('');
    }
  };

 const handleDelete = (rollNo) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');

    if (confirmDelete) {
      fetch(`http://localhost:4000/api/students/${rollNo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete record');
          }

          // Update the data state after successful deletion
          const newData = data.filter((student) => student.roll_no !== rollNo);
          setData(newData);
          setSelectedRow(null); // Reset selected row after deletion
        })
        .catch((error) => {
          console.error('Error deleting record:', error.message);
        });
    }
  };


  const handlebuttonClick = (id) =>{
    setModalVisible(true);
     // Fetch the data of the selected row
    const selectedStudent = data.find((student) => student.id === id);

    // Set the input fields with the current data
    setUpdatedName(selectedStudent?.name || '');
    setUpdatedRollNo(selectedStudent?.rollNo || '');
    setUpdatedPhoneNumber(selectedStudent?.phoneNumber || '');
    setUpdatedCgpa(selectedStudent?.cgpa || '');
  }
  const handleRowClick = (id) => {
    setSelectedRow(id);
    //setModalVisible(true);
  };
    const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong style={{ color: 'black', fontSize: '24px' }}>STUDENT PORTFOLIO</strong>
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
                  <CTableHeaderCell scope="col">Update</CTableHeaderCell>
                   <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentRecords.map((student, index) => (
                  <CTableRow
                    key={student.id}
                    className={selectedRow === student.id ? 'selected-row' : ''}
                    onClick={() => handleRowClick(student.id)}
                  >
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{student.name}</CTableDataCell>
                    <CTableDataCell>{student.roll_no}</CTableDataCell>
                    <CTableDataCell>{student.phone_number}</CTableDataCell>
                    <CTableDataCell>{student.cgpa}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm" onClick={() => handlebuttonClick(student.id)}>
                        Update record
                      </CButton>
                    </CTableDataCell>
                     <CTableDataCell>
  <CButton
  color="info"  // Set the color to "info" for light blue
  size="sm"
  onClick={() => handleDelete(student.roll_no)}
>
  Delete
</CButton>

</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="d-flex justify-content-between mb-3">
  
</div>


            <CModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              aria-labelledby="UpdateModalLabel"
            >
              <CModalHeader>
                <CModalTitle id="UpdateModalLabel">Update Student Record</CModalTitle>
              </CModalHeader>
              <CModalBody className="text-center">
  <div className="row">
    <div className="col-md-6 text-md-right mb-3">
      <label className="font-weight-bold">Name:</label>
    </div>
    <div className="col-md-6 mb-3">
      <input
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className="form-control"
        placeholder="Enter name"
      />
    </div>
  </div>

  <div className="row">
    <div className="col-md-6 text-md-right mb-3">
      <label className="font-weight-bold">Roll No:</label>
    </div>
    <div className="col-md-6 mb-3">
      <input
        type="text"
        value={updatedRollNo}
        onChange={(e) => setUpdatedRollNo(e.target.value)}
        className="form-control"
        placeholder="Enter roll number"
      />
    </div>
  </div>

  <div className="row">
    <div className="col-md-6 text-md-right mb-3">
      <label className="font-weight-bold">Phone Number:</label>
    </div>
    <div className="col-md-6 mb-3">
      <input
        type="text"
        value={updatedPhoneNumber}
        onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
        className="form-control"
        placeholder="Enter phone number"
      />
    </div>
  </div>

  <div className="row">
    <div className="col-md-6 text-md-right mb-3">
      <label className="font-weight-bold">CGPA:</label>
    </div>
    <div className="col-md-6 mb-3">
      <input
        type="text"
        value={updatedCgpa}
        onChange={(e) => setUpdatedCgpa(e.target.value)}
        className="form-control"
        placeholder="Enter CGPA"
      />
    </div>
  </div>


</CModalBody>

              <CModalFooter>
              
  
     <CButton
    
    style={{
      background: 'linear-gradient(45deg, #808080, #001f3f)', // Gradient of grey and dark blue
      color: 'white', // Custom text color
      border: '1px solid darkred', // Custom border
      borderRadius: '5px', // Custom border radius
      fontSize: '18px', // Custom font size
      padding: '10px 20px', // Custom padding
      
      
    }}
      className="mx-auto"
      onClick={handleUpdate}
  >
    Update Record
  </CButton>
  
               
              </CModalFooter>
            </CModal>
             <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array.from({ length: totalPageCount }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  );
};

export default StudentPortfolio;
