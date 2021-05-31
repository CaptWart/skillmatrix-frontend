import React, { useState, useEffect } from "react";
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import ReactDOM from 'react-dom';
import EmployeeCards from '../../components/employeecard/employeecard'
import Area from '../../components/Addarea/addarea'
import API from "../../utils/API";

function Manager(){

   const [employeeData, setEmployeeData] = useState();
   
   const loadEmployees = async () => {
       const getemployees = await API.getYourEmployee();
       setEmployeeData(await getemployees.data);
   }
   
   useEffect(() => {
       loadEmployees();
       
   }, [])
   
   useEffect( () => {
       console.log(employeeData)
   }, [employeeData])

    return(
        <div>
            <Header/>
            <h1>This manager page</h1>
            <EmployeeCards>{employeeData}</EmployeeCards>
            <Footer/>
        </div>
    )
}

export default Manager;