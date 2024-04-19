import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/data';
// import EventCard from '../components/EventCard'; // Assuming EventCard component is in the same directory
import HostEvent from './HostEvent'; // Assuming HostEvent component is in the same directory
import EventCardHost from '../components/EventCardHost';

const MyEvents = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      title: 'Event 1',
      description: 'Description of Event 1',
      venue: 'Venue 1',
      imageUrl: images[0],
    },
    {
      id: 2,
      title: 'Event 2',
      description: 'Description of Event 2',
      venue: 'Venue 2',
      imageUrl: images[1],
    },
    {
      id: 3,
      title: 'Event 2',
      description: 'Description of Event 2',
      venue: 'Venue 2',
      imageUrl: images[1],
    },
    // Add more events as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-max items-start">
      <HostEvent /> 

      {events.map(event => (
        <EventCardHost
          key={event.id}
          imageUrl={event.imageUrl}
          title={event.title}
          description={event.description}
          venue={event.venue}
          id={event.id}
        />
      ))}
    </div>
  );
};

export default MyEvents;
