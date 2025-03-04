import React from 'react';

const TeamCollaboration = ({ role }) => {
  // Define team members for admin and user roles
  const adminTeam = [
    { name: 'Nat Reynolds', role: 'Senior Partner', image: 'https://via.placeholder.com/150' },
    { name: 'Mattie Smith', role: 'Financial Director', image: 'https://via.placeholder.com/150' },
    { name: 'Betty Nilson', role: 'Chief Accountant', image: 'https://via.placeholder.com/150' },
    { name: 'Betty Nilson', role: 'Chief Accountant', image: 'https://via.placeholder.com/150' },
    { name: 'Betty Nilson', role: 'Chief Accountant', image: 'https://via.placeholder.com/150' },
    { name: 'Betty Nilson', role: 'Chief Accountant', image: 'https://via.placeholder.com/150' },
  ];

  const userTeam = [
    { name: 'Bob Roberts', role: 'Sales Manager', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Roxie Swanson', role: 'Creative Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Adrian Scold', role: 'Consultant', image: 'https://via.placeholder.com/150' },
  ];

  // Select team members based on the role
  const teamMembers = role === 'admin' ? adminTeam : userTeam;

  return (
    <div className="w-full bg-gray-100 py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <p className="text-gray-600 mt-4">
          Meet the people behind the work, connect with them directly.
        </p>
      </div>
      
      {/* Grid to display team members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-center">{member.name}</h3>
            <p className="text-center text-gray-600">{member.role}</p>
            <div className="flex justify-center space-x-4 mt-4">
              {/* Placeholder social icons */}
              <span className="cursor-pointer text-blue-600 hover:text-blue-800">
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className="cursor-pointer text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter"></i>
              </span>
              <span className="cursor-pointer text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin"></i>
              </span>
            </div>
            <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded-md hover:bg-blue-600">
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCollaboration;
