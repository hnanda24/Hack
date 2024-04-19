import {Link} from 'react-router-dom'
const EventCardHost = ({ imageUrl, title, description, venue ,id}) => {
    return (
      <div className=" rounded overflow-hidden shadow-lg w-full h-max bg-white">
      <div className="w-full h-52">
        <img className="w-full h-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className='flex flex-col w-full justify-start gap-2'>
          <div>
            <p className="text-gray-700 text-base">{description}</p>
            <p className="text-gray-700 text-base">Venue: {venue}</p>
          </div>
          
              <Link to={`/manage-event/${id}`} className="border-2 border-white text-center text-white rounded-xl bg-blue-600 hover:bg-blue-800 hover:text-white px-2 p-1">Manage Event</Link>
              
          
        </div>
      </div>
    </div>
    );
  };
  export default EventCardHost;