import { useState } from "react";
import axios from "axios";

const EmployeeForm = ({ setEmployees }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    role: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("doing submit");
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/server/employees",
        data: employeeData,
      });
      console.log(response);
      // get the created event
      if (response.status >= 200 && response.status < 300) {
        // ADD response.data to the events state!
        setEmployees((employees) => {
          return [...employees, response.data];
        });
        console.log("Employee registered successfully:", response.data);
      } else {
        console.error("Error registering employee:", response.data);
      }
    } catch (error) {
      console.error("There was an error sending the request:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* input */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* input */}
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
          />
        </div>

        {/* input */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
