  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import {events, images} from '../assets/data'
  import EventCard from '../components/EventCard';
import Slideshow from '../components/Slideshow';

  const Events = () => {
    const [realEvents, setRealEvents] = useState([]);
    // Assuming you have event data as an array of objects
    async function getEvents(){
      let response = await fetch('http://localhost:3000/user/all-events', {
        method: 'GET',
      });

      let data = await response.json();
      console.log(data.data);
      setRealEvents(data.data);
    }

    useEffect(()=>{
      getEvents();
    }, [])

    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <Navbar/> */}
        <Slideshow slides={images}/>

        <div key={'LATEST EVENTS'} className="mb-6">
          <h2 className="text-3xl font-bold text-center mb-2">LATEST EVENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realEvents.map((event, index) => (
              <Link key={event._id} to={`/event-page/${event._id}`}>
                <EventCard
                  key={event._id}
                  imageUrl={event.eventName}
                  title={event.eventName}
                  description={`Description of ${event.eventName}`}
                  venue={`Venue ${index + 1}`}
                  id={event._id}
                />
              </Link>
            ))}
          </div>
        </div>

        {events.map(category => (
          <div key={category.category} className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-2">{category.category.toUpperCase()}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.data.map(event => (
                <EventCard
                  key={event.id}
                  imageUrl={event.imageUrl}
                  title={event.title}
                  description={event.description}
                  venue={event.venue}
                  id={event.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default Events;
