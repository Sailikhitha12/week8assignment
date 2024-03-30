import React, { useState, useEffect } from 'react';
import { api_uri } from '../../config';
import { useLocation } from 'react-router-dom';
function Eventbrowser({ username, onLogin }) {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${api_uri}/api/auth/events`);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }

  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents(e.target.value, categoryFilter); 
  };

  const handleRegisterEvent = async (eventId) => {
    try {
      const response = await fetch(`${api_uri}/api/auth/register-event/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      if (response.ok) {
        console.log("In handleRegisterEvent");
      } else {
        console.log('Failed to register for event');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };
  console.log('username in Login:', username);

  return (
    <>
      <div className="browse-events">
        <div className="container">
          <h1>Browse Events</h1>
          <div className="filter-options">
            <input className='search' type="text" placeholder="Search Events" value={searchTerm} onChange={handleSearch}/>
            <select onChange={handleCategoryFilter}>
              <option value="Categories">All Categories</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Event">Event</option> 
            </select>
          </div>
          <div className="event-list">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} handleRegisterEvent={handleRegisterEvent} />

            ))}
          </div>
          {showRegisteredEvents && <RegisteredEvents userId={userId} />}
        </div>
      </div>
    </>
  );
}

export default BrowseEvents;