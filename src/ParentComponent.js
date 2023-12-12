import React, { useState } from 'react';
import { ComplaintBox, HostelWarden } from './yourComponentPath';

const ParentComponent = () => {
  const [submittedComplaints, setSubmittedComplaints] = useState([]);
  const [gatePassRequests, setGatePassRequests] = useState([]);

  const handleComplaintSubmit = (complaint) => {
    console.log('Complaint submitted:', complaint);
    setSubmittedComplaints([...submittedComplaints, complaint]);
  };

  const handleGatePassRequest = (request) => {
    console.log('Gate pass request submitted:', request);
    setGatePassRequests([...gatePassRequests, request]);
  };

  return (
    <>
      <ComplaintBox onComplaintSubmit={handleComplaintSubmit} onGatePassRequest={handleGatePassRequest} />
      {/* Other components */}
      <HostelWarden submittedComplaints={submittedComplaints} gatePassRequests={gatePassRequests} />
    </>
  );
};

export default ParentComponent;
