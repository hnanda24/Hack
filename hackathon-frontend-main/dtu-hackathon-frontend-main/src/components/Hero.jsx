import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you are using it for routing

const Hero = () => {
  return (
    <div className="relative h-screen top-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1435686858161-59da32dfd4b4?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          filter: ' brightness(0.2)', // Apply blur effect and dark backdrop filter
          opacity: 0.8, // Set opacity
        }}
      ></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start text-lg px-4 gap-2 text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center">Welcome to Event Management</h1>
        <div className="flex flex-col gap-4 text-center">
          <div className='text-left'>
              <p>Plan and organize your events seamlessly.</p>
              <p>Register now to get started!</p>
          </div>
          <Link to="/sign-up" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
