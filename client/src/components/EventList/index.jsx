import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Event from "../Event";

const EventList = ({ events, setEvents }) => {
  // compnent lifecycle
  // 1. mounts (state runs, code runs, JSX gets put on screen)
  // 2. useEffects run
  // 3. setState
  // 4. rerender (recalculate state, code runs, NEW JSX)
  // 5. dismounts ?

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios("/server/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  // ^ we can specify what chagnes should cause the funciton to run again

  console.log("I'm on first render, before useEffect");

  const handleDelete = async (eventId) => {
    // 1. go to Mongodb and delte from database
    let response = await axios({
      method: "DELETE",
      // DELETE     /events/:idOfEvent
      url: `/server/events/${eventId}`,
    });
    if (response.status === 200) {
      // 2. It's still in state! Still on the screen
      // 3. so - set state without this ID!
      setEvents(events.filter((event) => event._id !== eventId));
    }
  };

  // showForm, setShowForm = useState(false)
  // idToShow

  // which event should the form change?
  // ONE FORM?
  // a form for each?

  return (
    <div className="event-list">
      <h1>My List Of Events</h1>
      {events.map((event) => (
        <Event
          key={event._id}
          event={event}
          setEvents={setEvents}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default EventList;
