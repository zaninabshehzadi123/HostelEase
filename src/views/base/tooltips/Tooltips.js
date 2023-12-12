/* eslint-disable prettier/prettier */

import './StudentForm.css';
import React, { Component } from "react";    
    
class StudentForm extends Component {    
    constructor(props) {    
        super(props);    
        this.state = {    
            rollNo: '',
            studName: '',    
            cgpa: '',    
            phoneNumber: '',    
            city: 'select',    
            formErrors: {}    
        };    
    
        this.initialState = this.state;    
    }    
    
    handleFormValidation() {    
        const { rollNo, studName, cgpa, phoneNumber, city } = this.state;    
        let formErrors = {};    
        let formIsValid = true;    
    
        // Roll No
        if (!rollNo) {
            formIsValid = false;
            formErrors["rollNoErr"] = "Roll No is required.";
        }

        // Student name     
        if (!studName) {    
            formIsValid = false;    
            formErrors["studNameErr"] = "Name is required.";    
        }    

        // CGPA    
        if (!cgpa) {    
            formIsValid = false;    
            formErrors["cgpaErr"] = "CGPA is required.";    
        }

        
    // Phone number    
if (!phoneNumber) {    
    formIsValid = false;    
    formErrors["phoneNumberErr"] = "Phone number is required.";    
}    
else {    
    // Updated phone number pattern
    var mobPattern = /^(03[0-9]{2})-[0-9]{7}$/;    
    if (!mobPattern.test(phoneNumber)) {    
        formIsValid = false;    
        formErrors["phoneNumberErr"] = "Invalid phone number. Please use the format 0302-1234567.";    
    }    
}

        // City    
        if (city === '' || city === "select") {    
            formIsValid = false;    
            formErrors["cityErr"] = "Select city.";    
        }    
    
        this.setState({ formErrors: formErrors });    
        return formIsValid;    
    }    
    
    handleChange = (e) => {    
        const { name, value } = e.target;    
        this.setState({ [name]: value });    
    }    
    
    handleSubmit = (e) => {    
        e.preventDefault();    
    
        if (this.handleFormValidation()) {    
            alert('You have been successfully registered.')    
            this.setState(this.initialState)    
        }    
    }    
    
    render() {    
        const { rollNoErr, studNameErr, cgpaErr, phoneNumberErr, cityErr } = this.state.formErrors;    
    
        return (    
            <div className="formDiv">    
                <h3 style={{ textAlign: "center" }}>Student Admission Form</h3>    
                <div>    
                    <form onSubmit={this.handleSubmit}>    
                        <div>    
                            <label htmlFor="rollNo">Roll Number:</label>    
                            <input
                                type="text"
                                name="rollNo"
                                value={this.state.rollNo}
                                onChange={this.handleChange}
                                placeholder="Enter Roll Number."
                                className={rollNoErr ? 'showError' : ''}
                            />
                            {rollNoErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{rollNoErr}</div>
                            }    
                        </div>
                        <div>    
                            <label htmlFor="studName">Student Name:</label>    
                            <input
                                type="text"
                                name="studName"
                                value={this.state.studName}
                                onChange={this.handleChange}
                                placeholder="Enter Student Name.."
                                className={studNameErr ? 'showError' : ''}
                            />    
                            {studNameErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{studNameErr}</div>    
                            }    
                        </div>
                        <div>    
                            <label htmlFor="cgpa">CGPA:</label>    
                            <input
                                type="text"
                                name="cgpa"
                                value={this.state.cgpa}
                                onChange={this.handleChange}
                                placeholder="Enter CGPA.."
                                className={cgpaErr ? 'showError' : ''}
                            />    
                            {cgpaErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{cgpaErr}</div>    
                            }    
                        </div>
                        <div>    
                            <label htmlFor="phoneNumber">Phone Number:</label>    
                            <input
                                type="text"
                                name="phoneNumber"
                                onChange={this.handleChange}
                                value={this.state.phoneNumber}
                                placeholder="Enter Phone Number.."
                                className={phoneNumberErr ? 'showError' : ''}
                            />    
                            {phoneNumberErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{phoneNumberErr}</div>    
                            }    
                        </div>
                        <div>    
                            <label htmlFor="city">City:</label>    
                            <select
                                name="city"
                                value={this.state.city}
                                onChange={this.handleChange}
                                className={cityErr ? 'showError' : ''}
                            >
                                <option value="select">--Select--</option>    
                                <option value="Faisalabad">Faisalabad</option>    
                                <option value="Karachi">Karachi</option>    
                                <option value="Islamabad">Islamabad</option>    
                            </select>    
                            {cityErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div>    
                            }    
                        </div>
                        <input type="submit" value="Sudmit" />    
                    </form>    
                </div>    
            </div>    
        )    
    }    
}    
    
export default StudentForm;
