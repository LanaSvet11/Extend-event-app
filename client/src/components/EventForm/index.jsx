import { useState } from "react";
import axios from "axios";

const EventForm = ({ setEvents }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    organizer: {
      name: "",
      role: "",
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOrganizerChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      organizer: {
        ...prevState.organizer,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    console.log("doing submit");
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/server/events",
        data: eventData,
      });
      console.log(response);
      // get the created event
      if (response.status >= 200 && response.status < 300) {
        // ADD response.data to the events state!
        setEvents((events) => {
          return [...events, response.data];
        });
        console.log("Event registered successfully:", response.data);
      } else {
        console.error("Error registering event:", response.data);
      }
    } catch (error) {
      console.error("There was an error sending the request:", error);
    }
    // setEventData({
    //   title: '',
    //   date: '',
    //   location: '',
    //   description: '',
    //   organizer: {
    //     name: '',
    //     role: ''
    //   }
    // })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* input */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
          />
        </div>
        {/* input */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
          />
        </div>

        {/* input */}
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* input */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* input */}
        <div>
          <h4>Organizer Details</h4>

          <label htmlFor="organizerName">Name:</label>
          <input
            type="text"
            id="organizerName"
            name="name"
            value={eventData.organizer.name}
            onChange={handleOrganizerChange}
          />

          <label htmlFor="organizerRole">Role:</label>
          <input
            type="text"
            id="organizerRole"
            name="role"
            value={eventData.organizer.role}
            onChange={handleOrganizerChange}
          />
        </div>

        <button type="submit">Register Event</button>
      </form>
    </div>
  );
};

export default EventForm;
