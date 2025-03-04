import React from 'react';

const ClientMessages = ({ role }) => {
  const adminMessages = [
    { name: 'David', text: 'Hey, how’s the project?', date: '10:45 AM' },
    { name: 'William', text: 'I want changes in the design', date: '5:01 AM' },
    { name: 'Jon Snow', text: 'Can we reschedule the meeting?', date: 'Yesterday' },
  ];

  const userMessages = [
    { name: 'Stephanie', text: 'I got your first assignment!', date: '10:02 AM' },
    { name: 'Michael', text: 'Any updates on the deadline?', date: '9:30 AM' },
    { name: 'John Doe', text: 'I’ve finished my part!', date: '8:15 AM' },
  ];

  // Select messages based on the role
  const messages = role === 'admin' ? adminMessages : userMessages;

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-blue-400 rounded-lg mb-3 hover:bg-blue-700 cursor-pointer"
        >
          {/* Left side - user icon placeholder and message */}
          <div className="flex items-center">
            {/* Placeholder for profile icon */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white text-lg font-semibold">{msg.name[0]}</span>
            </div>
            {/* Message details */}
            <div>
              <h3 className="font-semibold text-white">{msg.name}</h3>
              <p className="text-white text-sm">{msg.text}</p>
            </div>
          </div>
          {/* Right side - date or time */}
          <div className="text-white text-sm">{msg.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientMessages;
