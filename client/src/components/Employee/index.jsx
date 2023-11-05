/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";

const Employee = ({ employee, handleDelete, setEmployees }) => {
  //  we will have many of this compnent!

  // EACH ONE will have a showform state
  const [show, setShow] = useState(false);
  const [newRole, setNewRole] = useState(employee.role);

  const handleClick = (employeeId) => {
    // axios call to our PUT route
    // id,   new information
    // PUT            /events/:idOfEvent/
    axios({
      url: `/server/employees/${employeeId}`,
      method: "PUT",
      data: {
        role: newRole,
      },
      // FIND THIS IN THE REQ.BODY
    }).then((response) => {
      setEmployees((employees) => {
        // find the event to change
        // replace it with response.body
        // response.body is the UPDATED object
        // []

        let stateCopy = employees.map((employeeObj) => {
          if (employeeObj._id === response.data._id) {
            return response.data;
          } else {
            return employeeObj;
          }
        });
        return stateCopy;
      });
    });
  };

  return (
    <div key={employee._id} className="event-item">
      <button onClick={() => handleDelete(employee._id)}>Delete</button>
      <button onClick={() => setShow(!show)}>Edit</button>
      <h2>{employee.name}</h2>
      <p>Role: {employee.role}</p>
      <p>Email: {employee.email}</p>

      {/* show form? */}
      {show ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input value={newRole} onChange={(e) => setNewRole(e.target.value)} />
          <button onClick={() => handleClick(employee._id)}>
            Update Employee
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Employee;
