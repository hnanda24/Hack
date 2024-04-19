import React, { useState } from 'react';

const ManageZone = () => {
    const [zones, setZones] = useState([]);
    const [connections, setConnections] = useState([]);

    const [newZone, setNewZone] = useState('');
    const [zoneToDelete, setZoneToDelete] = useState('');
    const [connectionFrom, setConnectionFrom] = useState('');
    const [connectionTo, setConnectionTo] = useState('');

    const handleAddZone = () => {
    
    };

    const handleDeleteZone = () => {
      
    };

    const handleAddConnection = () => {
     
    };

    return (
        <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Zones */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Zones</h2>
                    <ul>
                        {zones.map((zone, index) => (
                            <li key={index} className="mb-2">{zone}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newZone}
                        onChange={e => setNewZone(e.target.value)}
                        placeholder="Enter new zone name"
                        className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <div className="flex mt-2">
                        <button onClick={handleAddZone} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Add Zone</button>
                        <button onClick={handleDeleteZone} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete Zone</button>
                    </div>
                </div>
                
                {/* Connections */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Connections</h2>
                    <ul>
                        {connections.map((connection, index) => (
                            <li key={index} className="mb-2">{connection.from} - {connection.to}</li>
                        ))}
                    </ul>
                    <div className="flex mt-4">
                        <input
                            type="text"
                            value={connectionFrom}
                            onChange={e => setConnectionFrom(e.target.value)}
                            placeholder="From"
                            className="w-full p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <input
                            type="text"
                            value={connectionTo}
                            onChange={e => setConnectionTo(e.target.value)}
                            placeholder="To"
                            className="w-full p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <button onClick={handleAddConnection} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Connection</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageZone;
