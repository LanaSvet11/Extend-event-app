import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Employee from "../Employee";

const EmployeeList = ({ employees, setEmployees }) => {
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios("/server/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEmployees();
  }, []);
  // ^ we can specify what chagnes should cause the funciton to run again

  console.log("I'm on first render, before useEffect");

  const handleDelete = async (employeeId) => {
    // 1. go to Mongodb and delte from database
    let response = await axios({
      method: "DELETE",
      // DELETE     /events/:idOfEvent
      url: `/server/employees/${employeeId}`,
    });
    if (response.status === 200) {
      // 2. It's still in state! Still on the screen
      // 3. so - set state without this ID!
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    }
  };

  return (
    <div className="employee-list">
      <h1>List Of Employees</h1>
      {employees.map((employee) => (
        <Employee
          key={employee._id}
          employee={employee}
          setEmployees={setEmployees}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
